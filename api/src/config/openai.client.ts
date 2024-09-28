// server/src/config/openai.client.ts
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import config from './env.config';

// Initialize OpenAIClient outside the function to reuse the client instance
const credential = new AzureKeyCredential(config.azureOpenAI.apiKey);
const client = new OpenAIClient(config.azureOpenAI.endpoint, credential);

export default client;
