// server/src/controllers/documentController.ts

import { Request, Response } from 'express';
import { uploadToAzureBlob } from '../services/azureStorageService';
import { chunkDocument } from '../services/documentProcessingService';
import { generateEmbeddings } from '../services/embeddingService';
import { saveChunksToCosmos } from '../services/cosmosService';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import logger from '../utils/logger';

export const uploadDocument = async (req: Request, res: Response) => {
  const file = req.file;

  try {
    logger.info('Received upload request');

    if (!file) {
      logger.error('No file uploaded.');
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!['.pdf', '.txt'].includes(fileExtension)) {
      logger.error('Unsupported file format.');
      return res.status(400).json({ message: 'Unsupported file format. Only .pdf and .txt are allowed.' });
    }

    logger.info(`Uploading file: ${file.originalname} from path: ${file.path}`);

    // Upload to Azure Blob Storage and read file content concurrently
    const [blobUrl, fileContent] = await Promise.all([
      uploadToAzureBlob(file.path, file.originalname),
      readFileContent(file)
    ]);
    logger.info(`File uploaded to Blob Storage at URL: ${blobUrl}`);

    // Chunk the document
    const chunks = chunkDocument(fileContent);
    logger.info(`Document chunked into ${chunks.length} chunks`);

    // Filter out empty chunks
    const nonEmptyChunks = chunks.filter(chunk => chunk.trim() !== '');
    logger.info(`Non-empty chunks: ${nonEmptyChunks.length}`);

    if (nonEmptyChunks.length === 0) {
      logger.error('No content to process in the uploaded file.');
      return res.status(400).json({ message: 'No content to process in the uploaded file.' });
    }

    // Generate embeddings for each chunk
    const chunksWithEmbeddings = await generateEmbeddings(nonEmptyChunks);
    logger.info('Embeddings generated for all chunks');

    // Save chunks and embeddings to Cosmos DB
    await saveChunksToCosmos(chunksWithEmbeddings, blobUrl);
    logger.info('Chunks and embeddings saved to Cosmos DB');

    // Send success response
    res.status(200).json({ message: 'File uploaded and processed successfully.' });

  } catch (error: any) {
    logger.error('Error uploading document:', error);
    res.status(500).json({ message: 'Internal Server Error.', error: error.message });

  } finally {
    // Always attempt to clean up the local file
    if (file) {
      try {
        await fs.promises.unlink(file.path);
        logger.info(`Local file deleted: ${file.path}`);
      } catch (unlinkError) {
        logger.error(`Error deleting local file: ${file.path}`, unlinkError);
      }
    }
  }
};

// Helper function to read file content based on file extension
const readFileContent = async (file: Express.Multer.File): Promise<string> => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (fileExtension === '.pdf') {
    const dataBuffer = await fs.promises.readFile(file.path);
    const data = await pdf(dataBuffer);
    return data.text;
  } else {
    return await fs.promises.readFile(file.path, 'utf-8');
  }
};
