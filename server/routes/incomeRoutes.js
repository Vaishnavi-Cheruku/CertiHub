// routes/incomeRoutes.js - Update this file
import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  createIncomeCertificate,
  getUserIncomeCertificates,
  getStaffApplications,
  updateApplicationStatus,
  getApplicationById,
  getStaffWorkload
} from '../controllers/incomeController.js';

const router = express.Router();

// User routes
router.post('/', upload.single('photo'), createIncomeCertificate);
router.get('/user/:userId', getUserIncomeCertificates);

// Staff routes
router.get('/staff/:staffId/:status', getStaffApplications);
router.put('/:applicationId/status', updateApplicationStatus);
router.get('/:applicationId', getApplicationById);
router.get('/staff/workload', getStaffWorkload);

export default router;