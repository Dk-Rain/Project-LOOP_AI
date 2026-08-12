import { db } from "./db";

// Retrieve feedbacks containing keywords from the query, scoped strictly to workspaceId (Tenant Isolation)
export async function retrieveRelevantDocs(query: string, workspaceId: string) {
  try {
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 2); // Filter out short stop words

    if (keywords.length === 0) {
      // Fallback: get recent feedbacks in workspace
      return await db.feedback.findMany({
        where: { workspaceId },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { themes: true }
      });
    }

    // Query database where content matches keywords
    const feedbacks = await db.feedback.findMany({
      where: {
        workspaceId,
        OR: keywords.map(word => ({
          content: {
            contains: word,
            mode: "insensitive" as const
          }
        }))
      },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { themes: true }
    });

    return feedbacks;
  } catch (e) {
    return [];
  }
}
