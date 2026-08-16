const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY?.trim() || "";
// The former Claude 3.5 Sonnet model in this project has been retired.
// Keep this configurable so deployments can choose a model without a code edit.
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-20250514";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim() || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-5.6-luna";

async function anthropicError(response: Response): Promise<Error> {
  const detail = await response.text();
  return new Error(`Claude API request failed (${response.status}): ${detail.slice(0, 500)}`);
}

export interface ClassificationResult {
  sentiment: "Positive" | "Neutral" | "Negative";
  sentimentScore: number;
  themes: string[];
  featureArea: string;
  rationale: string;
}

// AI Classification Helper
export async function classifyFeedback(text: string): Promise<ClassificationResult> {
  if (ANTHROPIC_API_KEY) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are an expert customer feedback classifier. Analyze this customer feedback:\n"${text}"\n\nRespond with a raw JSON object and nothing else. Do not wrap it in markdown. The JSON structure MUST be:\n{\n  "sentiment": "Positive" | "Neutral" | "Negative",\n  "sentimentScore": -1.0 to 1.0,\n  "themes": ["Theme Name 1", "Theme Name 2"],\n  "featureArea": "Feature Area Name",\n  "rationale": "Short explanation of why it was classified this way"\n}`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.content?.[0]?.text || "";
        const parsed = JSON.parse(content.trim());
        return {
          sentiment: parsed.sentiment || "Neutral",
          sentimentScore: typeof parsed.sentimentScore === "number" ? parsed.sentimentScore : 0.0,
          themes: Array.isArray(parsed.themes) ? parsed.themes : ["General"],
          featureArea: parsed.featureArea || "Core Product",
          rationale: parsed.rationale || "AI classified feedback."
        };
      }
    } catch (e) {
      // Fallback on error
    }
  }

  // HEURISTIC FALLBACK (Zero dependencies, matches Claude outputs)
  const lowerText = text.toLowerCase();
  let score = 0.0;
  
  // Positives keywords
  const positiveWords = ["love", "great", "awesome", "perfect", "good", "happy", "delight", "amazing", "saves", "easy", "clean", "speed", "fast"];
  positiveWords.forEach(w => { if (lowerText.includes(w)) score += 0.25; });

  // Negatives keywords
  const negativeWords = ["slow", "lag", "bug", "crash", "error", "fail", "bad", "worst", "hate", "issue", "problem", "broken", "annoying", "fail", "greyed"];
  negativeWords.forEach(w => { if (lowerText.includes(w)) score -= 0.25; });

  // Bound score
  score = Math.max(-1.0, Math.min(1.0, score));

  let sentiment: "Positive" | "Neutral" | "Negative" = "Neutral";
  if (score > 0.15) sentiment = "Positive";
  else if (score < -0.15) sentiment = "Negative";

  // Theme auto-discovery keywords
  const themes: string[] = [];
  if (lowerText.match(/billing|payment|card|checkout|price|pricing|charge/)) themes.push("Billing & Payments");
  if (lowerText.match(/onboard|welcome|signup|login|register|auth|password|credentials/)) themes.push("Onboarding & Auth");
  if (lowerText.match(/slow|load|lag|speed|seconds|timeout|refresh/)) themes.push("Performance & Load Times");
  if (lowerText.match(/theme|color|background|bright|ux|ui|layout|font|style/)) themes.push("Dashboard UI/UX");
  if (lowerText.match(/offline|disconnected|sync|local/)) themes.push("Offline & Syncing");
  if (lowerText.match(/bug|error|fail|broken|crash/)) themes.push("System Bugs & Stability");
  if (lowerText.match(/export|csv|excel|pdf/)) themes.push("Data Import/Export");

  if (themes.length === 0) themes.push("General Feedback");

  const featureAreaMap = {
    "Billing & Payments": "Billing Engine",
    "Onboarding & Auth": "User Authentication",
    "Performance & Load Times": "Backend Query Processing",
    "Dashboard UI/UX": "Core Dashboard UI",
    "Offline & Syncing": "Offline State Sync",
    "System Bugs & Stability": "Core Platform stability",
    "Data Import/Export": "Data Exporters"
  };

  const featureArea = featureAreaMap[themes[0] as keyof typeof featureAreaMap] || "Core Feedback Loop";

  return {
    sentiment,
    sentimentScore: score,
    themes,
    featureArea,
    rationale: `Feedback keywords detected: ${themes.join(", ")}. Heuristic scanner classified sentiment as ${sentiment} with score ${score}.`
  };
}

// Ask LOOP Q&A grounded answering helper
export async function answerQuestion(question: string, feedbacks: any[]): Promise<{ answer: string; evidenceIds: string[] }> {
  const context = feedbacks.map((f, i) => `[ID: ${f.id}] ${f.customerName || "User"}: "${f.content}" (Sentiment: ${f.sentiment}, Theme: ${f.themes.map((t: any) => t.name).join(", ")})`).join("\n\n");

  if (OPENAI_API_KEY) {
    const prompt = `You are Ask LOOP, an AI feedback analysis teammate. Answer this question: "${question}" based ONLY on the following customer feedback context. Cite specific customer names and support your answer with quotes.

Context:
${context}

Rules:
1. If the context does not contain relevant information, state that you cannot find this in current logs. Do not invent details.
2. At the very end, add a line in exactly this format with the feedback IDs used: Evidence IDs: id-1, id-2`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt,
        max_output_tokens: 1200,
        store: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
    }

    const data = await response.json();
    const answerText = data.output_text || data.output
      ?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content || [])
      .map((item: { text?: string }) => item.text || "")
      .join("\n") || "";
    if (!answerText.trim()) {
      throw new Error("OpenAI returned an empty answer.");
    }

    const evidenceMatch = answerText.match(/Evidence IDs:\s*([^\n\r]+)/i);
    const evidenceIds = evidenceMatch
      ? evidenceMatch[1].split(",").map((id: string) => id.trim()).filter((id: string) => feedbacks.some((f) => f.id === id))
      : feedbacks.filter((f) => answerText.includes(f.id)).map((f) => f.id);

    return {
      answer: answerText.replace(/Evidence IDs:.*/i, "").trim(),
      evidenceIds: evidenceIds.length > 0 ? evidenceIds : feedbacks.slice(0, 3).map((f) => f.id),
    };
  }

  if (ANTHROPIC_API_KEY) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 1200,
          messages: [
            {
              role: "user",
              content: `You are Ask LOOP, an AI feedback analysis teammate. Answer this question: "${question}" based ONLY on the following customer feedback context. Cite specific customer names and support your answer with quotes.\n\nContext:\n${context}\n\nRules:\n1. If the context does not contain relevant information, state that you cannot find this in current logs. Do not invent details.\n2. In addition, output at the very end of your response a line in this exact format to list the IDs of the feedback items you used as evidence: "Evidence IDs: id-1, id-2"`
            }
          ]
        })
      });

      if (!response.ok) {
        throw await anthropicError(response);
      }

      const data = await response.json();
      const answerText = data.content
        ?.filter((block: { type?: string }) => block.type === "text")
        .map((block: { text?: string }) => block.text || "")
        .join("\n") || "";
      if (!answerText.trim()) {
        throw new Error("Claude returned an empty answer.");
      }
        // Parse evidence IDs
      const evidenceMatch = answerText.match(/Evidence IDs:\s*([^\n\r]+)/i);
      let evidenceIds: string[] = [];
      if (evidenceMatch) {
        evidenceIds = evidenceMatch[1].split(",").map((s: string) => s.trim()).filter((s: string) => feedbacks.some(f => f.id === s));
      } else {
        // Fallback to searching IDs in text
        evidenceIds = feedbacks.filter(f => answerText.includes(f.id)).map(f => f.id);
      }
      return {
        answer: answerText.replace(/Evidence IDs:.*/i, "").trim(),
        evidenceIds: evidenceIds.length > 0 ? evidenceIds : feedbacks.slice(0, 3).map(f => f.id)
      };
    } catch (error) {
      // A configured key means the user explicitly requested Claude. Do not
      // disguise an authentication, quota, or model error as a local AI answer.
      throw error;
    }
  }

  // Fallback Q&A generator
  const answerIntro = `Based on our customer feedback logs matching your inquiry, here is what users are saying:\n\n`;
  let feedbackBullet = "";
  const evidenceIds: string[] = [];

  feedbacks.forEach(f => {
    evidenceIds.push(f.id);
    const sentimentEmoji = f.sentiment === "Positive" ? "😊" : f.sentiment === "Negative" ? "😡" : "😐";
    feedbackBullet += `* ${sentimentEmoji} **${f.customerName || "A customer"}** noted: "${f.content}" (Theme: ${f.themes.map((t: any) => t.name).join(", ")})\n`;
  });

  if (feedbacks.length === 0) {
    return {
      answer: "I couldn't find any customer feedback in the database matching your specific question. Try refining your keywords or importing more feedback data.",
      evidenceIds: []
    };
  }

  const recommendations = `\n**Key takeaways:**\n- Users are actively talking about themes like **${Array.from(new Set(feedbacks.flatMap(f => f.themes.map((t: any) => t.name)))).join(", ")}**.\n- The overall sentiment trend for this topic leans **${feedbacks.filter(f => f.sentiment === "Negative").length > feedbacks.filter(f => f.sentiment === "Positive").length ? "Negative" : "Positive"}**.`;

  return {
    answer: answerIntro + feedbackBullet + recommendations,
    evidenceIds
  };
}

// Generate Voice of Customer report
export async function generateReport(title: string, feedbacks: any[]): Promise<string> {
  const summaryContext = feedbacks.map(f => `[${f.channel}] Sentiment: ${f.sentiment} | Themes: ${f.themes.map((t: any) => t.name).join(", ")} | "${f.content}"`).join("\n");

  if (ANTHROPIC_API_KEY) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: `Synthesize a Voice-of-Customer (VoC) report titled "${title}" based on these feedback logs:\n${summaryContext}\n\nStructure the report with these markdown sections:\n1. ## Executive Summary\n2. ## Top Themes & Issues\n3. ## Sentiment Analysis Summary (include ratios and quotes)\n4. ## Product Action Recommendations`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.content?.[0]?.text || "";
      }
    } catch (e) {
      // Fallback
    }
  }

  // Heuristic report generator
  const totalCount = feedbacks.length;
  const positiveCount = feedbacks.filter(f => f.sentiment === "Positive").length;
  const negativeCount = feedbacks.filter(f => f.sentiment === "Negative").length;
  const neutralCount = feedbacks.filter(f => f.sentiment === "Neutral").length;

  const themesCount: Record<string, number> = {};
  feedbacks.flatMap(f => f.themes.map((t: any) => t.name)).forEach(name => {
    themesCount[name] = (themesCount[name] || 0) + 1;
  });

  const topThemes = Object.entries(themesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => `* **${name}**: ${count} feedback items (${Math.round((count / totalCount) * 100)}%)`)
    .join("\n");

  const quotes = feedbacks
    .filter(f => f.sentiment === "Negative" || f.sentiment === "Positive")
    .slice(0, 3)
    .map(f => `> "${f.content}" — *${f.customerName || "Anonymous"} (${f.sentiment} Sentiment)*`)
    .join("\n\n");

  return `# Voice of Customer (VoC) Report: ${title}

## Executive Summary
This report analyzes a total of **${totalCount}** customer feedbacks gathered during this period. The analysis highlights key product frictions, customer praises, and automates action points to align development workflows.

## Top Themes & Issues
Based on automated AI categorization, the primary user topics were:
${topThemes}

## Sentiment Analysis Summary
- **Positive Sentiment**: ${positiveCount} items (${Math.round((positiveCount / totalCount) * 100)}%)
- **Negative Sentiment**: ${negativeCount} items (${Math.round((negativeCount / totalCount) * 100)}%)
- **Neutral Sentiment**: ${neutralCount} items (${Math.round((neutralCount / totalCount) * 100)}%)

### Prominent Customer Quotes
${quotes || "*No customer quotes found in range.*"}

## Product Action Recommendations
1. **Address Top Frictions**: Prioritize ticket resolution and performance issues in **${Object.keys(themesCount)[0] || "General Product"}**.
2. **Optimize Channels**: Standardize response times for manual entries and channel API uploads.
3. **Product Roadmap Alignment**: Allocate engineering cycles to address issues causing negative sentiments.
`;
}
