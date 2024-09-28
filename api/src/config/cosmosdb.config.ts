// server/src/config/cosmosdb.config.ts
import { PartitionKeyDefinitionVersion, PartitionKeyKind, CosmosClient, Container } from '@azure/cosmos';
import logger from '../utils/logger';
import config from './env.config';

class CosmosDB {
  private static instance: CosmosDB;
  private client: CosmosClient;
  private embeddingsContainer!: Container;
  private chatContainer!: Container;
  private initialized: boolean = false;
  private initializing: Promise<void> | null = null;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.client = new CosmosClient({
      endpoint: config.cosmos.endpoint,
      key: config.cosmos.key,
    });
  }

  // Public method to get the singleton instance
  public static getInstance(): CosmosDB {
    if (!CosmosDB.instance) {
      CosmosDB.instance = new CosmosDB();
    }
    return CosmosDB.instance;
  }

  // Initialize the database and containers
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (this.initializing) {
      return this.initializing;
    }

    this.initializing = this.init();
    return this.initializing;
  }

  // Internal initialization logic
  private async init(): Promise<void> {
    try {
      // Create database if it doesn't exist
      const { database } = await this.client.databases.createIfNotExists({
        id: config.cosmos.database,
        throughput: 400 // Adjust as needed or make configurable
      });

      // Initialize EmbeddingsContainer
      this.embeddingsContainer = await this.createContainerIfNotExists(database, 'EmbeddingsContainer');

      // Initialize ChatContainer
      this.chatContainer = await this.createContainerIfNotExists(database, 'ChatContainer');

      this.initialized = true;
      logger.info('CosmosDB initialization completed successfully');
    } catch (error: any) {
      logger.error('Error initializing CosmosDB:', error);
      logger.error('Error details:', error.message);
      if (error.code) {
        logger.error('Error code:', error.code);
      }
      if (error.body) {
        logger.error('Error body:', JSON.stringify(error.body, null, 2));
      }
      throw error;
    }
  }

  // Helper method to create a container if it doesn't exist
  private async createContainerIfNotExists(database: any, containerId: string): Promise<Container> {
    const containerDefinition = {
      id: containerId,
      partitionKey: {
        paths: ["/id"],
        version: PartitionKeyDefinitionVersion.V2,
        kind: PartitionKeyKind.Hash,
      },
    };
    const { container } = await database.containers.createIfNotExists(containerDefinition);
    return container;
  }

  // Getters for the containers
  public getEmbeddingsContainer(): Container {
    if (!this.initialized) {
      throw new Error('CosmosDB has not been initialized. Call initialize() first.');
    }
    return this.embeddingsContainer;
  }

  public getChatContainer(): Container {
    if (!this.initialized) {
      throw new Error('CosmosDB has not been initialized. Call initialize() first.');
    }
    return this.chatContainer;
  }
}

export default CosmosDB;
