import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

type FeedbackTimestamp = {
  createdAt: Date;
};

type SpikingTheme = {
  id: string;
  name: string;
  recentCount: number;
  previousCount: number;
  growthPercent: number;
  isSpiking: boolean;
};

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const themes = await db.theme.findMany({
      where: { workspaceId: user.workspaceId },
      include: {
        feedbacks: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    const spikingThemes: SpikingTheme[] = themes.map((theme: (typeof themes)[number]) => {
      const recentCount = theme.feedbacks.filter(
        (feedback: FeedbackTimestamp) =>
          feedback.createdAt >= sevenDaysAgo && feedback.createdAt <= now
      ).length;

      const previousCount = theme.feedbacks.filter(
        (feedback: FeedbackTimestamp) =>
          feedback.createdAt >= fourteenDaysAgo && feedback.createdAt < sevenDaysAgo
      ).length;

      let growth = 0;
      if (previousCount === 0 && recentCount > 0) {
        growth = recentCount * 100; // 100% per recent item if started from 0
      } else if (previousCount > 0) {
        growth = Math.round(((recentCount - previousCount) / previousCount) * 100);
      }

      return {
        id: theme.id,
        name: theme.name,
        recentCount,
        previousCount,
        growthPercent: growth,
        isSpiking: growth >= 20 && recentCount >= 2, // Spiking threshold: 20% growth and at least 2 occurrences
      };
    });

    // Sort by growth percentage descending, showing spiking ones first
    spikingThemes.sort((a, b) => b.growthPercent - a.growthPercent);

    return NextResponse.json({ success: true, themes: spikingThemes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to calculate spiking themes" }, { status: 500 });
  }
}
