// server/src/initCosmosDB.ts
import CosmosDB from './cosmosdb.config';

/**
 * Initializes the CosmosDB Singleton.
 */
const initializeCosmosDB = async () => {
  const cosmosDB = CosmosDB.getInstance();
  await cosmosDB.initialize();
};

export default initializeCosmosDB;
