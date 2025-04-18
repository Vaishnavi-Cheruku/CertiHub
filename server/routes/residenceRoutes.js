import express from 'express';
import { createResidenceCertificate, getResidenceApplications, getResidenceApplicationById } from '../controllers/residenceController.js';
import residenceUpload from '../middleware/residenceUpload.js';

const router = express.Router();

router.post('/', residenceUpload, createResidenceCertificate);
router.get('/', getResidenceApplications);
router.get('/:id', getResidenceApplicationById);

export default router;
