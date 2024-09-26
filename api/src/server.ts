import config from './config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import queryRoutes from './routes/queryRoutes';
import logger from './utils/logger';
import limiter from './middleware/rate-limiter'


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


// Start server
app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
});