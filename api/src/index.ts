import config from './config/server.config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';


// Create Express server
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});