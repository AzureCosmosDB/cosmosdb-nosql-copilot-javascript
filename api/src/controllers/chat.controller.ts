import { Request, Response } from 'express';
import config from '../config/server.config';
import { client, maxTokens } from '../config/openai.client';
import  logger from '../utils/logger';

export const promptChat = async (req: Request, res: Response) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).send('Question is required');
    }

    try {
        // Set headers to support streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Connection', 'keep-alive');

        // Stream the chat completions
        const events = await client.streamChatCompletions(
            config.deployment,
            [
                {
                    role: "user",
                    content: question,
                },
            ],
            {
                maxTokens: maxTokens,
            }
        );

        // console.log("Receiving stream...");
        for await (const event of events) {
            for (const choice of event.choices) {
                if (choice.delta?.content) {
                    const chunk = choice.delta.content;
                    res.write(chunk);
                    // console.log(`Received chunk: ${choice.delta.content}`); // Log each chunk for better debugging
                }
            }
        }

        res.end();
    } catch (error) {
        logger.error('Error streaming response:', error);
        res.status(500).send('An error occurred while streaming the response.');
    }
}