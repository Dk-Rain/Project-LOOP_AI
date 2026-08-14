import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { classifyFeedback } from "@/lib/ai";

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const channel = searchParams.get("channel") || "";
    const sentiment = searchParams.get("sentiment") || "";
    const status = searchParams.get("status") || "";
    const themeName = searchParams.get("theme") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    // Build the query where clause
    const where: any = {
      workspaceId: user.workspaceId,
    };

    if (search) {
      where.content = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (channel) {
      where.channel = channel;
    }

    if (sentiment) {
      where.sentiment = sentiment;
    }

    if (status) {
      where.status = status;
    }

    if (themeName) {
      where.themes = {
        some: {
          name: themeName,
        },
      };
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        // Set end date to end of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    // Fetch feedbacks and count
    const [feedbacks, totalCount] = await Promise.all([
      db.feedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { themes: true },
      }),
      db.feedback.count({ where }),
    ]);

    return NextResponse.json({
      feedbacks,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch feedback logs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // RBAC: Check allowed roles
    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: You do not have permissions to ingest feedback." }, { status: 403 });
    }

    const { content, channel, customerName, customerEmail } = await request.json();

    if (!content || !channel) {
      return NextResponse.json({ error: "Content and channel are required" }, { status: 400 });
    }

    // Run AI Classification (sentiment, score, themes, feature area, rationale)
    const aiResult = await classifyFeedback(content);

    // Upsert classification themes in this workspace
    const themeConnects = await Promise.all(
      aiResult.themes.map(async (name) => {
        const theme = await db.theme.upsert({
          where: {
            name_workspaceId: {
              name,
              workspaceId: user.workspaceId!,
            },
          },
          create: {
            name,
            workspaceId: user.workspaceId!,
          },
          update: {},
        });
        return { id: theme.id };
      })
    );

    // Save feedback to the database scoped to workspaceId
    const feedback = await db.feedback.create({
      data: {
        content,
        channel,
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        featureArea: aiResult.featureArea,
        rationale: aiResult.rationale,
        customerName: customerName || null,
        customerEmail: customerEmail || null,
        status: "NEW",
        workspaceId: user.workspaceId,
        themes: {
          connect: themeConnects,
        },
      },
      include: { themes: true },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to ingest feedback" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user?.workspaceId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: You do not have permission to delete feedback." }, { status: 403 });
    }

    const { feedbackIds } = await request.json();
    if (!Array.isArray(feedbackIds) || feedbackIds.length === 0 || feedbackIds.some((id) => typeof id !== "string")) {
      return NextResponse.json({ error: "Select at least one feedback item to delete" }, { status: 400 });
    }

    const result = await db.feedback.deleteMany({ where: { id: { in: feedbackIds }, workspaceId: user.workspaceId } });
    return NextResponse.json({ success: true, deletedCount: result.count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete feedback" }, { status: 500 });
  }
}
