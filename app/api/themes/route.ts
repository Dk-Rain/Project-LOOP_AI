import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

type ThemeWithFeedbacks = {
  id: string;
  name: string;
  createdAt: Date;
  feedbacks: Array<{
    sentiment: string;
    sentimentScore: number;
  }>;
};

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve themes and their feedbacks for analysis
    const themes = await db.theme.findMany({
      where: { workspaceId: user.workspaceId },
      include: {
        feedbacks: {
          select: {
            id: true,
            sentiment: true,
            sentimentScore: true,
            createdAt: true,
          },
        },
      },
    });

    // Format theme summaries
    const summaries = themes.map((theme: ThemeWithFeedbacks) => {
      const feedbacks = theme.feedbacks;
      const count = feedbacks.length;
      
      const totalScore = feedbacks.reduce((acc, curr) => acc + curr.sentimentScore, 0);
      const avgSentimentScore = count > 0 ? parseFloat((totalScore / count).toFixed(2)) : 0.0;

      // Group by sentiment
      const positiveCount = feedbacks.filter((f) => f.sentiment === "Positive").length;
      const negativeCount = feedbacks.filter((f) => f.sentiment === "Negative").length;
      const neutralCount = feedbacks.filter((f) => f.sentiment === "Neutral").length;

      return {
        id: theme.id,
        name: theme.name,
        count,
        avgSentimentScore,
        sentimentDistribution: {
          positive: positiveCount,
          negative: negativeCount,
          neutral: neutralCount,
        },
        createdAt: theme.createdAt,
      };
    });

    // Sort by count descending
    summaries.sort((a, b) => b.count - a.count);

    return NextResponse.json({ success: true, themes: summaries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch themes" }, { status: 500 });
  }
}
