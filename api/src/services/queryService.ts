// server/src/services/queryService.ts
import axios from 'axios';
import { cosineSimilarity } from '../utils/cosineSimilarity';
import logger from '../utils/logger';
import config from '../config/env.config';
import { SqlQuerySpec } from '@azure/cosmos';
import CosmosDB from '../config/cosmosdb.config';

/**
 * Retrieves the top K relevant chunks from Cosmos DB based on cosine similarity
 * between the query embedding and the embeddings stored in Cosmos DB.
 *
 * @param query The query string to retrieve relevant chunks for.
 * @param topK The number of chunks to retrieve (default: 5).
 * @returns An array of strings, each representing a chunk of text.
 */
export const retrieveRelevantChunks = async (query: string, topK: number = 5): Promise<string[]> => {
  try {
    // Validate query
    if (!query || query.trim().length === 0) {
      logger.error('Query is empty.');
      throw new Error('Query cannot be empty.');
    }

    logger.info(`Generating embedding for query: "${query}"`);

    // Generate embedding for the query
    const queryEmbeddingResponse = await axios.post(
      `${config.azureOpenAI.endpoint}/openai/deployments/${config.azureOpenAI.models.embedding}/embeddings?api-version=2022-12-01`,
      {
        input: query,
        // model: EMBEDDING_MODEL // Typically not required as deployment specifies the model
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': config.azureOpenAI.apiKey,
        },
        timeout: 10000, // Optional: Set a timeout
      }
    );

    logger.info(`Embedding response: ${JSON.stringify(queryEmbeddingResponse.data)}`);

    const queryEmbedding = queryEmbeddingResponse.data.data[0].embedding;

    // Fetch all embeddings from Cosmos DB (Consider vector indexing for scalability)
    const querySpec: SqlQuerySpec = {
      query: 'SELECT TOP @topK c.text, c.embedding FROM c',
      parameters: [{ name: '@topK', value: topK }]
    };

    const cosmosDB = CosmosDB.getInstance();
    const embeddingsContainer = cosmosDB.getEmbeddingsContainer();

    const { resources } = await embeddingsContainer.items.query(querySpec).fetchAll();

    logger.info(`Total chunks retrieved from Cosmos DB: ${resources.length}`);

    // Calculate cosine similarity
    const similarities = resources.map((item: any) => ({
      text: item.text,
      similarity: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    // Sort by similarity and select top K
    similarities.sort((a, b) => b.similarity - a.similarity);

    const topChunks = similarities.slice(0, topK).map((item) => item.text);

    logger.info(`Top ${topChunks.length} relevant chunks selected.`);

    return topChunks;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      logger.error(`Axios error while retrieving embeddings: ${error.message}`);
      logger.error(`Axios response data: ${JSON.stringify(error.response?.data)}`);
    } else {
      logger.error(`Unexpected error while retrieving embeddings: ${error.message}`);
    }
    throw error;
  }
};
