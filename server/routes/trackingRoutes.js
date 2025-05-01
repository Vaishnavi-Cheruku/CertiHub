// routes/trackingRoute.js
import express from 'express';
import {
  trackApplicationById
} from '../controllers/trackingController.js';

const router = express.Router();

router.get('/:applicationId', trackApplicationById);

export default router;
