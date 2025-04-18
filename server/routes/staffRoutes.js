import express from "express";
import staffAuth from "../middleware/staffAuth.js";
import { getStaffData } from "../controllers/staffController.js";

const staffRouter = express.Router();

// ✅ Get Staff Data (Authenticated Staff Only)
staffRouter.get("/data", staffAuth, getStaffData);

export default staffRouter;
