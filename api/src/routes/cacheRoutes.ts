import express from 'express';
import { clearCache } from '../controllers/cacheController';

const router = express.Router();

/**
 * @route DELETE /api/cache
 * @desc Clears the cache by deleting all items in Cosmos DB and Azure Storage containers.
 * @access Protected (Consider adding authentication middleware if necessary)
 */
router.delete('/', clearCache);

export default router;
