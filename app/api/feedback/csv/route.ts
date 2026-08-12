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

    const { rows } = await request.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "Invalid rows data format" }, { status: 400 });
    }

    const ingestedFeedbacks = [];

    // Process rows sequentially to avoid database lock/API throttle issues
    for (const row of rows) {
      const content = row.content || "";
      const channel = row.channel || "CSV_IMPORT";
      const customerName = row.customerName || null;
      const customerEmail = row.customerEmail || null;

      if (!content.trim()) continue;

      // Classify
      const aiResult = await classifyFeedback(content);

      // Upsert themes
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

      // Save
      const feedback = await db.feedback.create({
        data: {
          content,
          channel,
          sentiment: aiResult.sentiment,
          sentimentScore: aiResult.sentimentScore,
          featureArea: aiResult.featureArea,
          rationale: aiResult.rationale,
          customerName,
          customerEmail,
          status: "NEW",
          workspaceId: user.workspaceId,
          themes: {
            connect: themeConnects,
          },
        },
      });

      ingestedFeedbacks.push(feedback);
    }

    return NextResponse.json({ success: true, count: ingestedFeedbacks.length, feedbacks: ingestedFeedbacks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process bulk import" }, { status: 500 });
  }
}
