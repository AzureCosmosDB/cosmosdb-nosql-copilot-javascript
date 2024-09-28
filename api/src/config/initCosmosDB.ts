// server/src/initCosmosDB.ts
import CosmosDB from './cosmosdb.config';
import logger from '../utils/logger';

/**
 * Initializes the CosmosDB Singleton.
 */
const initializeCosmosDB = async () => {
  const cosmosDB = CosmosDB.getInstance();
  await cosmosDB.initialize();
};

export default initializeCosmosDB;
