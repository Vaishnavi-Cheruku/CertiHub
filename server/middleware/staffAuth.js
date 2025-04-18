import jwt from "jsonwebtoken";
import staffModel from "../models/staffModel.js";

// Middleware to authenticate staff
const staffAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const staff = await staffModel.findById(decoded.id);

        if (!staff) {
            return res.status(404).json({ success: false, message: "Staff not found. Please log in again." });
        }

        req.staff = staff;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};

// Middleware to check role-based access
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.staff || !roles.includes(req.staff.role)) {
            return res.status(403).json({ success: false, message: "Unauthorized access!" });
        }
        next();
    };
};

export default staffAuth;
