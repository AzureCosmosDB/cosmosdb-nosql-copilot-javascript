// server/src/services/embeddingService.ts
import axios from 'axios';
import logger from '../utils/logger';
import config from '../config';
import { retryWrapper } from '../utils/retryWrapper';

/**
 * Generates embeddings for a given array of strings (chunks) using Azure OpenAI's Embeddings API.
 *
 * @param chunks - An array of strings to generate embeddings for.
 * @returns An array of objects containing the original text and its corresponding embedding.
 */
export const generateEmbeddings = async (chunks: string[]): Promise<any[]> => {
  try {
    const embeddings = [];

    const batchSize = 20; // Adjust based on API limits and performance
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batchChunks = chunks.slice(i, i + batchSize);
      const url = `${config.azureOpenAI.endpoint}/openai/deployments/${config.azureOpenAI.models.embedding}/embeddings?api-version=2022-12-01`;
      logger.info(`Sending embedding request to: ${url}`);
      logger.debug(`Batch chunks content: ${batchChunks.map(chunk => chunk.substring(0, 50)).join(', ')}...`); // Log first 50 characters of each chunk in the batch

      const response = await retryWrapper(() => axios.post(
        url,
        {
          input: batchChunks,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': config.azureOpenAI.apiKey,
          },
        }
      ));

      embeddings.push(...response.data.data.map((item: any, index: number) => ({
        text: batchChunks[index],
        embedding: item.embedding,
      })));

      logger.info(`Embedding generated for chunk.`);
    }

    return embeddings;
  } catch (error: any) {
    logger.error('Error generating embeddings:', error.response?.data || error.message);
    throw error;
  }
};