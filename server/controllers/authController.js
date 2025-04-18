import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register = async (req, res) => {
    const { name, email, password, phone, address, governmentId, profilePicture } = req.body;

    if (!name || !email || !password || !address || !governmentId) {
        return res.json({ success: false, message: 'Missing Required Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            governmentId,
            profilePicture,
            isAccountVerified: false,
            applicationIds: []
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Sending welcome email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to CertiHub',
            text: `Welcome to CertiHub! Your account has been created with email ID: ${email}`
        };

        try {
            console.log('📧 Attempting to send email to:', email);

            await transporter.sendMail(mailOption);

            console.log('✅ Email sent successfully to:', email);
        } catch (err) {
            console.error('❌ Email sending failed:', err);
        }

        return res.json({ success: true });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: 'Logged Out' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.body.userId || req.userId;  // Ensure we always have userId
        console.log("sendVerifyOtp called for userId:", userId); 

        const user = await userModel.findById(userId);
        if (!user) {
            console.log("❌ User not found");
            return res.json({ success: false, message: "User not found." });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 1 * 60 * 60 * 1000;
        await user.save();

        console.log("🔹 Generated OTP:", otp); 

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,  // ✅ Fix: Use user.email instead of undefined `email`
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
        };

        await transporter.sendMail(mailOption);

        console.log("✅ Verification email sent successfully to:", user.email);
        return res.json({ success: true, message: "Verification OTP sent to Mail Successfully!" });

    } catch (error) {
        console.error("❌ Error in sendVerifyOtp:", error.message);
        return res.json({ success: false, message: error.message });
    }
};


export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = null;  
        user.verifyOtpExpireAt = null;
        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//Check if user is authenticated
export const isAuthenticated = async (req, res)=>{
    try {
        return res.json({ success: true});
    } catch (error) {
    
        res.json({ success: false, message: error.message });
    }
};

//Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour expiry
        await user.save();

        // Send OTP email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your password reset OTP is: ${otp}. This OTP is valid for 1 hour.`
        };

        await transporter.sendMail(mailOption);
        console.log("✅ Password reset OTP email sent successfully to:", email);

        return res.json({ success: true, message: "Password reset OTP sent successfully!" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found.' });
        }

        if (user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (new Date(user.resetOtpExpireAt).getTime() < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear OTP fields
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully!' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//