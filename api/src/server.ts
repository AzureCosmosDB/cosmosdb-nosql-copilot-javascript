import config from './config/env.config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import limiter from './middleware/rate-limiter'
import initializeCosmosDB from './config/initCosmosDB';

import queryRoutes from './routes/queryRoutes';
import cacheRoutes from './routes/cacheRoutes';
import documentRoutes from './routes/documentRoutes';

// Create Express server
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Routes
app.use('/api/query', queryRoutes); //api/query
app.use('/api/cache', cacheRoutes); //api/cache
app.use('/api/document', documentRoutes); //api/documents/upload


// Start server
const startServer = async () => {
    try {
        await initializeCosmosDB();
        const PORT = config.port;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to initialize Cosmos DB:', error);
        process.exit(1);
    }
};

startServer();