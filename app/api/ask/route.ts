import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { retrieveRelevantDocs } from "@/lib/search";
import { answerQuestion } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question } = await request.json();

    if (!question || !question.trim()) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // 1. Search actual feedbacks matching query keyword and workspace ID (Tenant Security)
    const feedbacks = await retrieveRelevantDocs(question, user.workspaceId);

    // 2. Pass feedback contexts to AI grounder
    const aiAnswer = await answerQuestion(question, feedbacks);

    // Filter evidence feedbacks based on returned evidenceIds
    const evidenceFeedbacks = feedbacks.filter((f: { id: string }) => aiAnswer.evidenceIds.includes(f.id));

    return NextResponse.json({
      success: true,
      answer: aiAnswer.answer,
      evidence: evidenceFeedbacks,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to query Ask LOOP" }, { status: 500 });
  }
}
