// server/src/config/index.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Environment Variables
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000; // Default to 8000 if not set

// Cosmos DB Configuration
export const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT as string;
export const COSMOS_KEY = process.env.COSMOS_KEY as string;
export const COSMOS_DB = process.env.COSMOS_DB as string;
export const COSMOS_CONTAINER = process.env.COSMOS_CONTAINER as string;

// Azure Storage Account Configuration
export const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
export const AZURE_STORAGE_CONTAINER = process.env.AZURE_STORAGE_CONTAINER as string;

// Azure OpenAI Configuration
export const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY as string;
export const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT as string;

// Azure OpenAI Models
export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL as string;
export const CHAT_MODEL = process.env.CHAT_MODEL as string;
export const CHAT_API_VERSION = process.env.CHAT_MODEL_API_VERSION as string; // Renamed variable for consistency

// Azure OpenAI Max Tokens
export const MAX_TOKENS = process.env.AZURE_OPENAI_MAX_TOKEN
  ? parseInt(process.env.AZURE_OPENAI_MAX_TOKEN, 10)
  : 150; // Default to 150 if not set

// List of required environment variables
const requiredEnvVars = [
  'COSMOS_ENDPOINT',
  'COSMOS_KEY',
  'COSMOS_DB',
  'COSMOS_CONTAINER',
  'AZURE_STORAGE_CONNECTION_STRING',
  'AZURE_STORAGE_CONTAINER',
  'AZURE_OPENAI_API_KEY',
  'AZURE_OPENAI_ENDPOINT',
  'EMBEDDING_MODEL',
  'CHAT_MODEL',
  'CHAT_MODEL_API_VERSION',
  'AZURE_OPENAI_MAX_TOKEN'
];

// Function to validate environment variables
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env variable: ${varName}`);
  }
});

// Consolidated Configuration Object
const config = {
  port: PORT!,
  cosmos: {
    endpoint: COSMOS_ENDPOINT!,
    key: COSMOS_KEY!,
    database: COSMOS_DB!,
  },
  azureStorage: {
    connectionString: AZURE_STORAGE_CONNECTION_STRING!,
    container: AZURE_STORAGE_CONTAINER!,
  },
  azureOpenAI: {
    apiKey: AZURE_OPENAI_API_KEY!,
    endpoint: AZURE_OPENAI_ENDPOINT!,
    models: {
      embedding: EMBEDDING_MODEL!,
      chat: CHAT_MODEL!,
      chatApiVersion: CHAT_API_VERSION!,
      openAIMaxTokens: MAX_TOKENS!
    },
  },
};

export default config;
