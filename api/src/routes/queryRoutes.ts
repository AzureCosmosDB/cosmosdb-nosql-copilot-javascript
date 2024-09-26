// server/src/routes/queryRoutes.ts
import express from 'express';
import { handleQuery } from '../controllers/queryController';

const router = express.Router();

router.post('/', handleQuery);

export default router;
