import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { classifyFeedback } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: Analyst or Admin permissions required." }, { status: 403 });
    }

    const { feedbackId } = await request.json();

    if (!feedbackId) {
      return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
    }

    // Fetch existing feedback and verify tenant isolation
    const feedback = await db.feedback.findUnique({
      where: { id: feedbackId },
      include: { themes: true }
    });

    if (!feedback || feedback.workspaceId !== user.workspaceId) {
      return NextResponse.json({ error: "Feedback item not found or unauthorized access" }, { status: 404 });
    }

    // Re-run AI classification
    const aiResult = await classifyFeedback(feedback.content);

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

    // Disconnect old themes and connect new ones, updating model fields
    const updatedFeedback = await db.feedback.update({
      where: { id: feedbackId },
      data: {
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        featureArea: aiResult.featureArea,
        rationale: aiResult.rationale,
        themes: {
          set: [], // Clear relations
          connect: themeConnects, // Connect new ones
        },
      },
      include: { themes: true },
    });

    return NextResponse.json({ success: true, feedback: updatedFeedback });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to reclassify feedback" }, { status: 500 });
  }
}
