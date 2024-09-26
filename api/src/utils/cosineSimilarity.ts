// server/src/utils/cosineSimilarity.ts
/**
 * Calculate the cosine similarity between two vectors.
 * @param {number[]} vecA the first vector
 * @param {number[]} vecB the second vector
 * @returns {number} the cosine similarity between the two vectors
 */
export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
    const dotProduct = vecA.reduce((acc, val, idx) => acc + val * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };
  