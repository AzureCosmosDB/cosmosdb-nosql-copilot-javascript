// server/src/services/cosmosService.ts
import { CosmosClient } from '@azure/cosmos';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import config from '../config';

const client = new CosmosClient({
  endpoint: config.cosmos.endpoint,
  key: config.cosmos.key,
});

const database = client.database(config.cosmos.database);
const container = database.container(config.cosmos.container);

export const saveChunksToCosmos = async (chunksWithEmbeddings: any[], blobUrl: string): Promise<void> => {
  try {
    for (const chunk of chunksWithEmbeddings) {
      const document = {
        id: uuidv4(), // Generate a unique UUID for each chunk
        text: chunk.text,
        embedding: chunk.embedding,
        blobUrl: blobUrl,
        createdAt: new Date().toISOString(),
      };

      logger.info(`Saving chunk with ID: ${document.id} to Cosmos DB`);

      await container.items.create(document);
      logger.info(`Chunk with ID: ${document.id} saved successfully`);
    }
  } catch (error: any) {
    logger.error('Error saving chunks to Cosmos DB:', error);
    throw error;
  }
};