import dotenv from 'dotenv';

dotenv.config();

// Environment variables
export const endpoint = process.env.AZURE_OPENAI_ENDPOINT as string;
export const azureApiKey = process.env.AZURE_OPENAI_API_KEY as string;
export const deployment = process.env.AZURE_OPENAI_MODEL_NAME as string;
const port = process.env.PORT  as string;

//assert that all parameters are valid
if (!endpoint || !azureApiKey || !deployment || !port) {
    throw new Error('Missing or invalid Azure OpenAI endpoint, API key, deployment name, or port.');
}

const config = {
    port,
    deployment,
    endpoint,
    azureApiKey
}

export default config