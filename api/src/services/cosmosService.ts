// server/src/services/cosmosService.ts
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import { pLimit } from 'plimit-lit';
import CosmosDB from '../config/cosmosdb.config';


/**
 * Saves chunks with embeddings to the Cosmos DB EmbeddingsContainer.
 * @param chunksWithEmbeddings Array of chunks with their embeddings.
 * @param blobUrl The URL of the blob associated with the chunks.
 */
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
      const embeddingsContainer = CosmosDB.getInstance().getEmbeddingsContainer();
      await embeddingsContainer.items.create(document);
      logger.info(`Chunk with ID: ${document.id} saved successfully`);
    }
  } catch (error: any) {
    logger.error('Error saving chunks to Cosmos DB:', error);
    throw error;
  }
};

/**
 * Deletes all items from the Cosmos DB EmbeddingsContainer.
 */
export const clearCosmosCache = async (): Promise<void> => {
  try {
    logger.info('Starting to clear Cosmos DB cache...');

    const querySpec = {
      query: 'SELECT c.id FROM c',
    };
    const embeddingsContainer = CosmosDB.getInstance().getEmbeddingsContainer();
    const { resources: items } = await embeddingsContainer.items.query(querySpec).fetchAll();

    if (items.length === 0) {
      logger.info('No items found in Cosmos DB container.');
      return;
    }

    const limit = pLimit(10); // Limit to 10 concurrent deletions

    const deletePromises = items.map(item =>
      limit(() =>
        embeddingsContainer.item(item.id, item.id).delete()
          .then(() => logger.debug(`Deleted item with ID: ${item.id}`))
          .catch(err => logger.error(`Failed to delete item with ID: ${item.id}`, err))
      )
    );

    await Promise.all(deletePromises);

    logger.info('Successfully cleared Cosmos DB cache.');
  } catch (error: any) {
    logger.error('Error clearing Cosmos DB cache:', error);
    throw error;
  }
};
