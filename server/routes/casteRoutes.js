import express from 'express';
import { createCasteCertificate, getCasteApplications, getCasteApplicationById } from '../controllers/casteController.js';
import casteUpload from '../middleware/casteUpload.js';

const router = express.Router();

router.post('/', casteUpload, createCasteCertificate);
router.get('/', getCasteApplications);
router.get('/:id', getCasteApplicationById);

export default router;
