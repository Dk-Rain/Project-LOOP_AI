import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("timeRange") || "30d";

    const now = new Date();
    let startDate = new Date();

    if (timeRange === "7d") {
      startDate.setDate(now.getDate() - 7);
    } else if (timeRange === "90d") {
      startDate.setDate(now.getDate() - 90);
    } else {
      // Default to 30d
      startDate.setDate(now.getDate() - 30);
    }

    // Common query filter: active workspace and time range
    const filter = {
      workspaceId: user.workspaceId,
      createdAt: {
        gte: startDate,
      },
    };

    // Calculate metrics
    const [
      totalCount,
      positiveCount,
      neutralCount,
      negativeCount,
      newThisWeekCount,
      recentFeedbacks,
      themes,
    ] = await Promise.all([
      db.feedback.count({ where: { workspaceId: user.workspaceId, createdAt: { gte: startDate } } }),
      db.feedback.count({ where: { workspaceId: user.workspaceId, sentiment: "Positive", createdAt: { gte: startDate } } }),
      db.feedback.count({ where: { workspaceId: user.workspaceId, sentiment: "Neutral", createdAt: { gte: startDate } } }),
      db.feedback.count({ where: { workspaceId: user.workspaceId, sentiment: "Negative", createdAt: { gte: startDate } } }),
      db.feedback.count({
        where: {
          workspaceId: user.workspaceId,
          createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      db.feedback.findMany({
        where: { workspaceId: user.workspaceId },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { themes: true },
      }),
      db.theme.findMany({
        where: { workspaceId: user.workspaceId },
        include: {
          feedbacks: {
            where: { createdAt: { gte: startDate } },
            select: { id: true },
          },
        },
      }),
    ]);

    // Format top themes
    const themeCounts = (themes as any[])
      .map((t: any) => ({ name: t.name as string, count: t.feedbacks.length as number }))
      .filter((t: any) => t.count > 0)
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 4);

    // Calculate percentage negative
    const percentNegative = totalCount > 0 ? Math.round((negativeCount / totalCount) * 100) : 0;
    
    // Average Sentiment Score calculation
    const averageScoreResult = await db.feedback.aggregate({
      where: { workspaceId: user.workspaceId, createdAt: { gte: startDate } },
      _avg: { sentimentScore: true }
    });
    const avgScore = averageScoreResult._avg.sentimentScore !== null ? parseFloat((averageScoreResult._avg.sentimentScore).toFixed(2)) : 0.0;
    const csatPercent = Math.round(((avgScore + 1) / 2) * 100); // map -1..1 to 0..100%

    // Feedback volume over time (split into 4 intervals/weeks)
    const intervalDays = timeRange === "7d" ? 1.75 : timeRange === "90d" ? 22.5 : 7.5; // days per interval
    const volumePoints = [];
    for (let i = 3; i >= 0; i--) {
      const startInterval = new Date(now.getTime() - (i + 1) * intervalDays * 24 * 60 * 60 * 1000);
      const endInterval = new Date(now.getTime() - i * intervalDays * 24 * 60 * 60 * 1000);
      
      const count = await db.feedback.count({
        where: {
          workspaceId: user.workspaceId,
          createdAt: {
            gte: startInterval,
            lte: endInterval,
          },
        },
      });
      volumePoints.push({ label: `Period ${4 - i}`, count });
    }

    return NextResponse.json({
      success: true,
      metrics: {
        totalCount,
        positiveCount,
        neutralCount,
        negativeCount,
        percentNegative,
        newThisWeekCount,
        csatPercent,
        avgScore,
      },
      themeCounts,
      recentFeedbacks,
      volumePoints,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate dashboard analytics" }, { status: 500 });
  }
}
