export async function classifyFeedback(text: string) {
  return { text, label: 'pending' };
}

export async function answerQuestion(question: string) {
  return { question, answer: 'Loop AI response placeholder' };
}

export async function generateReport(summary: string) {
  return { summary, report: 'Report draft placeholder' };
}
