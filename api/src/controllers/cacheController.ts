// src/controllers/cacheController.ts
import { Request, Response } from 'express';
import { clearCosmosCache } from '../services/cosmosService';
import { clearAzureStorageCache } from '../services/azureStorageService';
import logger from '../utils/logger';

/**
 * Handles the request to clear the cache.
 * Deletes all items from Cosmos DB and all blobs from Azure Storage.
 */
export const clearCache = async (req: Request, res: Response) => {
    // Clear Cosmos DB cache
    try {
        await clearCosmosCache();
        logger.info('Cosmos DB cache cleared successfully.');
    } catch (error) {
        logger.error('Error clearing Cosmos DB cache:', error);
        return res.status(500).json({ message: 'Failed to clear Cosmos DB cache.' });
    }

    // Clear Azure Storage cache
    try {
        await clearAzureStorageCache();
        logger.info('Azure Storage cache cleared successfully.');
    } catch (error) {
        logger.error('Error clearing Azure Storage cache:', error);
        return res.status(500).json({ message: 'Failed to clear Azure Storage cache.' });
    }

    logger.info('Cache cleared successfully.');
    return res.status(200).json({ message: 'Cache cleared successfully.' });
};
