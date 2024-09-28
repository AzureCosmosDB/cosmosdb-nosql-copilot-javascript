// server/src/controllers/queryController.ts

import { Request, Response } from 'express';
import config from '../config/env.config'; // Updated import path
import openaiClient from '../config/openai.client'; // Updated import path
import { retrieveRelevantChunks } from '../services/queryService';
import logger from '../utils/logger';
import { Readable } from 'stream';

// Define the type for messages to ensure type safety
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const handleQuery = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query || query.trim().length === 0) {
    logger.error('Received empty query.');
    return res.status(400).json({ message: 'Query cannot be empty.' });
  }

  try {
    logger.info(`Received query: "${query}"`);

    // Retrieve relevant chunks based on the query
    const relevantChunks = await retrieveRelevantChunks(query);
    logger.info(`Retrieved ${relevantChunks.length} relevant chunks.`);

    // Concatenate chunks to form context
    const context = relevantChunks.join('\n\n');

    // Prepare the messages array for the Chat Completion API
    const messages: ChatMessage[] = [
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: query },
      { role: 'system', content: `Context:\n${context}` },
    ];

    // Set headers to support streaming
    res.setHeader('Content-Type', 'text/event-stream'); // Use 'text/event-stream' for Server-Sent Events (SSE)
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    logger.info('Generating response from Azure OpenAI Chat API...');

    // Stream the chat completions
    const events = await openaiClient.streamChatCompletions(
      config.azureOpenAI.models.chat, // API version as deployment ID
      messages,
      {
        maxTokens: config.azureOpenAI.models.openAIMaxTokens,
        temperature: 0.7,
        // Add other parameters if needed
      }
    );

    logger.debug('Starting to receive stream...');
    try {
      const stream = new Readable({
        read() { }
      });

      stream.pipe(res);

      for await (const event of events) {
        for (const choice of event.choices) {
          if (choice.delta?.content) {
            stream.push(choice.delta.content);
          }
        }
      }

      stream.push(null);

      res.end();
      logger.info('Finished streaming response.');

    } catch (streamError: any) {
      logger.error('Error during streaming:', streamError);
      res.write('event: error\ndata: An error occurred while streaming the response.\n\n');
      res.end();
    }

  } catch (error: any) {
    logger.error('Error streaming response:', error);

    // If headers are not sent yet, set status code
    if (!res.headersSent) {
      res.status(500).send('An error occurred while streaming the response.');
    } else {
      // If headers are already sent, terminate the connection
      res.end();
    }
  }
};


