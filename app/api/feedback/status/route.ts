import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: Analyst or Admin permissions required." }, { status: 403 });
    }

    const { feedbackId, status } = await request.json();

    if (!feedbackId || !status) {
      return NextResponse.json({ error: "Feedback ID and status are required" }, { status: 400 });
    }

    // Validate status type
    if (status !== "NEW" && status !== "REVIEWED" && status !== "ACTIONED") {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // Verify feedback belongs to this workspace
    const feedback = await db.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback || feedback.workspaceId !== user.workspaceId) {
      return NextResponse.json({ error: "Feedback item not found or unauthorized" }, { status: 404 });
    }

    // Update status
    const updatedFeedback = await db.feedback.update({
      where: { id: feedbackId },
      data: { status },
    });

    return NextResponse.json({ success: true, feedback: updatedFeedback });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}
