import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/documentController';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Define the upload folder path
const uploadFolderPath = path.join(__dirname, '../uploads');

// Check if the uploads folder exists, if not, create it
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath, { recursive: true });
}

// Set up multer with the folder destination
const upload = multer({ dest: uploadFolderPath });

router.post('/upload', upload.single('file'), uploadDocument);

export default router;
