// server/src/services/azureStorageService.ts

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorage.connectionString);

// Get ContainerClient
const containerClient: ContainerClient = blobServiceClient.getContainerClient(config.azureStorage.container);

// Ensure the container exists. If not, create it.
const ensureContainerExists = async () => {
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
    console.log(`Created container: ${config.azureStorage.container}`);
  }
};

// Immediately invoke to ensure container exists
ensureContainerExists().catch((error) => {
  console.error('Error ensuring container exists:', error);
  throw error;
});

/**
 * Uploads a file to Azure Blob Storage.
 * @param filePath - The local path of the file to upload.
 * @param originalName - The original name of the file.
 * @returns The URL of the uploaded blob.
 */
export const uploadToAzureBlob = async (filePath: string, originalName: string): Promise<string> => {
  try {
    // Create a unique name for the blob to prevent overwriting
    const uniqueName = `${uuidv4()}-${path.basename(originalName)}`;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueName);

    // Read the file as a stream
    const fileStream = fs.createReadStream(filePath);

    // Upload the file stream to Azure Blob Storage
    await blockBlobClient.uploadStream(fileStream, undefined, undefined, {
      blobHTTPHeaders: { blobContentType: getContentType(originalName) },
    });

    console.log(`File uploaded successfully. Blob URL: ${blockBlobClient.url}`);

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading to Azure Blob Storage:', error);
    throw error;
  }
};

/**
 * Determines the MIME type based on the file extension.
 * @param filename - The name of the file.
 * @returns The corresponding MIME type.
 */
const getContentType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'application/pdf';
    case '.csv':
      return 'text/csv';
    case '.txt':
      return 'text/plain';
    case '.doc':
      return 'application/msword';
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    default:
      return 'application/octet-stream';
  }
};
