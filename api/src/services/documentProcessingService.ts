// server/src/services/documentProcessingService.ts

/**
 * Splits a document into chunks of a given size by splitting on sentences
 * and grouping them into chunks of no more than the given size.
 *
 * @param content - The document content as a string.
 * @param chunkSize - The maximum size of each chunk in characters. Defaults to 500.
 * @returns An array of strings, each representing a chunk of the document.
 */
export const chunkDocument = (content: string, chunkSize: number = 500): string[] => {
  const sentences = content.split(/\.\s+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length < chunkSize) {
      currentChunk += sentence + '. ';
    } else {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence + '. ';
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};
