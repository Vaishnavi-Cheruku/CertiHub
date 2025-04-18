import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  createIncomeCertificate,
  getUserIncomeCertificates
} from '../controllers/incomeController.js';

const router = express.Router();

// Use .single('photo') here
router.post('/', upload.single('photo'), createIncomeCertificate);
router.get('/:userId', getUserIncomeCertificates);

export default router;
