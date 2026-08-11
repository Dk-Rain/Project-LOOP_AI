export async function embedText(text: string) {
  return { text, embedding: [] };
}

export async function retrieveRelevantDocs(query: string) {
  return [{ id: '1', content: 'Placeholder search result' }];
}
