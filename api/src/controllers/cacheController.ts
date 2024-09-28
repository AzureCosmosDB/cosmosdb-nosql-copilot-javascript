// src/controllers/cacheController.ts

import { Request, Response } from 'express';
import { clearCosmosCache } from '../services/cosmosService';
import { clearAzureStorageCache } from '../services/azureStorageService';
import logger from '../utils/logger';

/**
 * Helper function to clear a specific cache and handle logging.
 * @param clearFunction - The function to clear the cache.
 * @param cacheName - The name of the cache being cleared.
 */
const clearSpecificCache = async (clearFunction: () => Promise<void>, cacheName: string): Promise<void> => {
    try {
        await clearFunction();
        logger.info(`${cacheName} cache cleared successfully.`);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        logger.error(`Error clearing ${cacheName} cache: ${errorMessage}`);
        throw new Error(`Failed to clear ${cacheName} cache.`);
    }
};

/**
 * Clears both Cosmos DB and Azure Storage caches.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns JSON response indicating success or failure.
 */
export const clearCache = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Clear both caches concurrently
        await Promise.all([
            clearSpecificCache(clearCosmosCache, 'Cosmos DB'),
            clearSpecificCache(clearAzureStorageCache, 'Azure Storage'),
        ]);

        logger.info('All caches cleared successfully.');
        return res.status(200).json({ message: 'All caches cleared successfully.' });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error(`Cache clearing process failed: ${errorMessage}`);
        return res.status(500).json({ message: errorMessage });
    }
};
