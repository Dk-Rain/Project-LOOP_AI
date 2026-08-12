import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { classifyFeedback } from "@/lib/ai";

const MOCK_TRANSCRIPTS = [
  {
    channel: "ZENDESK",
    content: "The analytics page is throwing an internal server error when we try to compile our weekly report. We need this working immediately for our presentation.",
    customerName: "Jane Miller",
    customerEmail: "jane.miller@acme.co",
  },
  {
    channel: "APP_STORE",
    content: "Absolutely loving the workspace custom actions! However, it needs offline state support so I can plan features while travelling.",
    customerName: "TravelerDev",
    customerEmail: null,
  },
  {
    channel: "DISCORD",
    content: "Hey, is there a dark mode toggle somewhere? The light dashboard is burning my eyes during night shifts.",
    customerName: "@nightcoder",
    customerEmail: null,
  },
  {
    channel: "INTERCOM",
    content: "Our team wants to export our monthly customer logs to Excel, but the export button is greyed out. Please let us know how we can activate this.",
    customerName: "Alan Vance",
    customerEmail: "alan.v@corporate.io",
  },
  {
    channel: "ZENDESK",
    content: "We're experiencing massive delay on billing checkout. It takes around 15 seconds to process payments and sometimes it times out.",
    customerName: "Robert Dow",
    customerEmail: "robert@checkoutflow.net",
  },
];

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN" && user.role !== "ANALYST") {
      return NextResponse.json({ error: "Forbidden: Analyst or Admin permissions required." }, { status: 403 });
    }

    // Pick a random feedback template
    const randomIndex = Math.floor(Math.random() * MOCK_TRANSCRIPTS.length);
    const selectedMock = MOCK_TRANSCRIPTS[randomIndex];

    // Classify
    const aiResult = await classifyFeedback(selectedMock.content);

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
        content: selectedMock.content,
        channel: selectedMock.channel,
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        featureArea: aiResult.featureArea,
        rationale: aiResult.rationale,
        customerName: selectedMock.customerName,
        customerEmail: selectedMock.customerEmail,
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
    return NextResponse.json({ error: error.message || "Failed to simulate channel ingestion" }, { status: 500 });
  }
}
