import express from "express";
import { 
    registerStaff, 
    loginStaff, 
    logoutStaff, 
    sendVerifyOtp, 
    verifyEmail, 
    sendResetOtp, 
    resetStaffPassword, 
    isAuthenticated 
} from "../controllers/StaffAuthController.js";

import staffAuth, { authorizeRoles } from "../middleware/staffAuth.js";

const staffAuthRouter = express.Router();

// ✅ Staff Registration (Only Admin can add staff)
staffAuthRouter.post("/register", staffAuth, authorizeRoles("Admin"), registerStaff);

// ✅ Staff Login
staffAuthRouter.post("/login", loginStaff);

// ✅ Staff Logout
staffAuthRouter.post("/logout", logoutStaff);

// ✅ Send OTP for Email Verification
staffAuthRouter.post("/send-verify-otp", staffAuth, sendVerifyOtp);

// ✅ Verify Staff Email
staffAuthRouter.post("/verify-account", staffAuth, verifyEmail);

// ✅ Check Authentication Status (Fixed to GET method)
staffAuthRouter.get("/is-auth", staffAuth, isAuthenticated);

// ✅ Send Password Reset OTP
staffAuthRouter.post("/send-reset-otp", sendResetOtp);

// ✅ Reset Password
staffAuthRouter.post("/reset-password", resetStaffPassword);

export default staffAuthRouter;
