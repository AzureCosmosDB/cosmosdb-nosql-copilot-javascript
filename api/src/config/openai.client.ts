import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { endpoint, azureApiKey, deployment } from './server.config'
// Initialize OpenAIClient outside the function to reuse the client instance

const credential = new AzureKeyCredential(azureApiKey);
const client = new OpenAIClient(endpoint, credential);
const maxTokens: number = 128


export { client, maxTokens }