import { OpenAIClient, AzureKeyCredential,ChatRequestMessage } from "@azure/openai";

// Set the Azure and AI Search values from environment variables
const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
// const deploymentId = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_ID;
// const searchEndpoint = import.meta.env.VITE_AZURE_AI_SEARCH_ENDPOINT;
// const searchKey = import.meta.env.VITE_AZURE_AI_SEARCH_API_KEY;
// const searchIndex = import.meta.env.VITE_AZURE_AI_SEARCH_INDEX;


async function main(){
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

  const messages = [
    { role: "user", content: "What are my available health plans?" },
  ];

  console.log(`Message: ${messages.map((m) => m.content).join("\n")}`);

  const events = await client.streamChatCompletions(deploymentId, messages, { 
    maxTokens: 128,
    azureExtensionOptions: {
      extensions: [
        {
          type: "AzureCognitiveSearch",
          endpoint: searchEndpoint,
          key: searchKey,
          indexName: searchIndex,
        },
      ],
    },
  });
  let response = "";
  for await (const event of events) {
    for (const choice of event.choices) {
      const newText = choice.delta?.content;
      if (!newText) {
        response += newText;
        // To see streaming results as they arrive, uncomment line below
        // console.log(newText);
      }
    }
  }
  console.log(response);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});



module.exports = { main };