import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { generateReport } from "@/lib/ai";

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reports = await db.report.findMany({
      where: { workspaceId: user.workspaceId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, reports });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch VoC reports" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: Analyst or Admin permissions required." }, { status: 403 });
    }

    const { title, startDate, endDate } = await request.json();

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Title, start date, and end date are required" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Fetch feedbacks in range for this workspace
    const feedbacks = await db.feedback.findMany({
      where: {
        workspaceId: user.workspaceId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: { themes: true },
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({ error: "No feedbacks found in the selected date range to compile a report." }, { status: 400 });
    }

    // Call AI report generator (Claude with heuristic fallback)
    const reportContent = await generateReport(title, feedbacks);

    // Save report to the database
    const report = await db.report.create({
      data: {
        title,
        periodStart: start,
        periodEnd: end,
        content: reportContent,
        workspaceId: user.workspaceId,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate VoC report" }, { status: 500 });
  }
}
