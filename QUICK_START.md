# CosmosDB-NoSQL-Copilot-JavaScript

This project is a full-stack application using **Node.js**, **TypeScript**, **React (Vite)**, **Azure CosmosDB**, **Azure Blob Storage**, and **Microsoft Authentication Library (MSAL)** for authentication. It also integrates with **Azure OpenAI** to enhance functionality.

## Features

- **Frontend:** Built using React with Vite for fast build times.
- **Backend:** Node.js with Express, connected to Azure CosmosDB for database operations.
- **Authentication:** Utilizes MSAL for authentication via Microsoft Identity Platform.
- **Integration:** Azure OpenAI integration for GPT-based model interaction.

---

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/en/download/)
- **Azure Account**: You can create one [here](https://azure.microsoft.com/en-us/free/)
- **CosmosDB and Azure OpenAI resources** configured in your Azure portal.

---

## Quick Start

Follow these steps to clone, set up, and run the project.

### Step 1: Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/AzureCosmosDB/cosmosdb-nosql-copilot-javascript
cd cosmosdb-nosql-copilot-javascript
```

### Step 2: Install Dependencies

Navigate to both the `/api` and `/client` directories and install the required dependencies.

#### Backend (API) Dependencies

```bash
cd api
npm install
```

#### Frontend (Client) Dependencies

```bash
cd ../client
npm install
```

### Step 3: Configure Environment Variables

In the root directories of both the `/api` and `/client` folders, you will find `.env` files. Add your specific credentials for **Azure CosmosDB**, **Azure Storage**, **Azure OpenAI**, and **Microsoft Authentication Library (MSAL)**.

Here are the variables you'll need to configure:

#### For API (`/api/.env`)

```bash
# Server Configuration
PORT=8000

# CosmosDB Configuration
COSMOS_ENDPOINT=https://your-cosmos-db-account.documents.azure.com:443/
COSMOS_KEY=your_cosmos_db_key
COSMOS_DB=your_database_name
COSMOS_CONTAINER=your_container_name

# Azure Storage Account
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
AZURE_STORAGE_CONTAINER=your_azure_storage_container

# Azure OpenAI
AZURE_OPENAI_API_KEY=your_openai_api_key
AZURE_OPENAI_ENDPOINT=https://your-openai-endpoint.openai.azure.com

# OpenAI Models
EMBEDDING_MODEL=text-embedding-ada-002
CHAT_MODEL=gpt-4-mini
CHAT_MODEL_API_VERSION=2024-07-18
AZURE_OPENAI_MAX_TOKEN=400
```

#### For Client (`/client/.env`)

```bash
# Microsoft Authentication Library (MSAL)
VITE_CLIENT_ID=your_client_id
VITE_SERVER_URI=http://localhost:8000/api
```

### Step 4: Running the Application

Once your environment is set up, you can run both the backend and frontend servers.

#### Backend (API)

```bash
cd api
npm run dev
```

#### Frontend (Client)

In a separate terminal window:

```bash
cd client
npm run dev
```

This will run the client application on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:8000](http://localhost:8000).

---

## Project Structure

The project is split into two main directories: **api** and **client**.

### `/api`

This directory contains the backend code, which is responsible for handling the server-side logic, connecting to CosmosDB, and managing authentication.

- **src/controllers**: Contains the main logic for handling API routes.
- **src/services**: Includes services that interact with the database and other external services.
- **uploads**: Storage for file uploads.

### `/client`

The client-side React application:

- **src/components**: Contains React components used in the UI.
- **src/hooks**: Custom React hooks.
- **public**: Public assets used by the client.
- **.env**: Configuration for MSAL and API endpoints.

---

## Scripts

### Backend (API)

- **`npm run dev`**: Starts the server in development mode with hot reloading.
- **`npm run build`**: Compiles the TypeScript code.
- **`npm run start`**: Runs the compiled JavaScript from the `dist` folder.

### Frontend (Client)

- **`npm run dev`**: Runs the client-side React app in development mode.
- **`npm run build`**: Builds the production version of the React app.
- **`npm run preview`**: Previews the production build.

---

## Dependencies

### Backend (API)

- **@azure/cosmos**: CosmosDB SDK.
- **@azure/openai**: Azure OpenAI SDK.
- **@azure/storage-blob**: Azure Storage SDK.

### Frontend (Client)

- **@azure/msal-react**: MSAL integration for React.
- **@azure/openai**: For interacting with Azure OpenAI models.
- **radix-ui/react**: UI components used for the interface.
- **axios**: For making HTTP requests to the backend API.

---

## Azure Resources Setup

### CosmosDB Setup

1. Go to your Azure portal and create a **CosmosDB account**.
2. In your **.env** file for the backend, add your **COSMOS_ENDPOINT** and **COSMOS_KEY**.

### Azure OpenAI Setup

1. Navigate to the **Azure OpenAI** service in the Azure portal.
2. Create an OpenAI resource and get your **API key** and **endpoint**.
3. Add the **AZURE_OPENAI_API_KEY** and **AZURE_OPENAI_ENDPOINT** to your backend `.env` file.

---

## License

This project is licensed under the [ISC License](./LICENSE).

---

This README.md template should give users clear guidance on how to set up and run your project. If there are specific details or adjustments you'd like to add, feel free to modify the sections accordingly.