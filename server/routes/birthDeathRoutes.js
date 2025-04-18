import express from "express";
import {
  submitBirthCertificate,
  getBirthCertificates,
  submitDeathCertificate,
  getDeathCertificates
} from "../controllers/birthDeathController.js";

const router = express.Router();

router.post("/birth-certificate", submitBirthCertificate);
router.get("/birth-certificate", getBirthCertificates);

router.post("/death-certificate", submitDeathCertificate);
router.get("/death-certificate", getDeathCertificates);

export default router;
