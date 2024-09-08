import { CosmosClient } from '@azure/cosmos';
import { InteractiveBrowserCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from "openai";


// Azure OpenAI and Authentication configuration
const clientId = import.meta.env.VITE_AZURE_CLIENT_ID || ""; // Ensure you have your Azure Client ID in .env
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID || ""; // Your Azure AD Tenant ID
const scope = "https://cognitiveservices.azure.com/.default";

// Initialize InteractiveBrowserCredential for browser authentication
const credential = new InteractiveBrowserCredential({
    clientId, // Your client ID from Azure AD App registration
    tenantId, // Your tenant ID
});
const azureADTokenProvider = getBearerTokenProvider(credential, scope);


const deployment = "gpt-4-1106-preview"; // Change this to your actual deployment name
const apiVersion = "2024-07-01-preview";

// Initialize Azure OpenAI client
const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

// Azure Cognitive Search configuration
const azureSearchEndpoint = import.meta.env.VITE_AZURE_SEARCH_ENDPOINT || "<search endpoint>";
const azureSearchIndexName = import.meta.env.VITE_AZURE_SEARCH_INDEX || "<search index>";

// Modified sendMessage function with Azure Cognitive Search and streaming support
export const sendMessage = async (message: string): Promise<string> => {
    try {
        // Send the message to Azure OpenAI and Azure Cognitive Search
        const events = await client.chat.completions.create({
        
            stream: true,
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            max_tokens: 128, // Adjust this as needed
            model: "gpt-4o-mini", // 
            data_sources: [
                {
                    type: "azure_search",
                    parameters: {
                        endpoint: azureSearchEndpoint,
                        index_name: azureSearchIndexName,
                        authentication: {
                            type: "system_assigned_managed_identity", // Use managed identity for authentication
                        },
                    },
                },
            ],
        });

        // Handle streaming of responses
        let finalResponse = "";
        for await (const event of events) {
            for (const choice of event.choices) {
                const content = choice.delta?.content || "";
                finalResponse += content; // Append the streamed content
                console.log(content); // Optionally log the streamed content in real-time
            }
        }

        return finalResponse.trim();
    } catch (error) {
        console.error('Error interacting with Azure OpenAI:', error);
        return 'Sorry, something went wrong.';
    }
};

// Cosmos DB configuration
const cosmosEndpoint = import.meta.env.VITE_COSMOS_ENDPOINT || "";
const cosmosKey = import.meta.env.VITE_COSMOS_KEY || "";
const newCosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const databaseId = 'ChatDB';
const containerId = 'Messages';

// Cosmos DB function to store message data
export const storeMessageInCosmos = async (messageData: any): Promise<void> => {
    const { database } = await newCosmosClient.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    await container.items.create(messageData);
};
