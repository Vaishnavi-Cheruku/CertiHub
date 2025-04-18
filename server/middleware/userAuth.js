import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(tokenDecode.id).select("-password"); // Fetch user from DB

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;  // ✅ Attach full user object to request
        next(); // Proceed to the next middleware

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session Expired. Please Login Again' });
        }

        return res.status(401).json({ success: false, message: 'Invalid Token. Login Again' });
    }
};

export default userAuth;
