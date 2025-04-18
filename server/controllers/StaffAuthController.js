import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import staffModel from '../models/staffModel.js';
import transporter from '../config/nodemailer.js';

// Admin registers a new staff member
export const registerStaff = async (req, res) => {
    // 🛠 Extract fields correctly
    const { fullName, email, phone, role, password } = req.body;

    if (!fullName || !email || !phone || !role || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // 🛠 Check if logged-in user is Admin (middleware should set `req.staff`)
        if (!req.staff || req.staff.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Only Admin can register staff' });
        }

        // 🛠 Check if staff already exists
        const existingStaff = await staffModel.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Staff already exists' });
        }

        // 🛠 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🛠 Create new staff account
        const staff = new staffModel({
            fullName, email, phone, role,
            password: hashedPassword,
            isActive: true, // Admin creates active staff
            createdBy: req.staff._id // Track who created this staff
        });

        await staff.save();

        const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
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
            subject: 'Welcome to CertiHub Team!',
            text: `Hello ${fullName}!\n Welcome to CertiHub! Your account has been created with email ID: ${email}`
        };
        
        try {
            console.log('📧 Attempting to send email to:', email);

            await transporter.sendMail(mailOption);

            console.log('✅ Email sent successfully to:', email);
        } catch (err) {
            console.error('❌ Email sending failed:', err);
        }

        return res.status(201).json({ success: true, message: 'Staff registered successfully.',
            token,staffId: staff._id
         });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Staff login
export const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find staff by email
        const staff = await staffModel.findOne({ email });

        if (!staff) {
            return res.status(404).json({ success: false, message: "Staff not found. Please check your email." });
        }

        // Check if staff is active
        if (!staff.isActive) {
            return res.status(403).json({ success: false, message: "Your account is deactivated. Contact admin." });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: staff._id, role: staff.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        // Send response with token
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            staffId: staff._id,
            role: staff.role
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Staff logout
export const logoutStaff = async (req, res) => {
    try {
        res.clearCookie('staffToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Send Verification OTP to Staff Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { staffId } = req.body;
        
        const staff = await staffModel.findById(staffId);
        if (!staff) return res.json({ success: false, message: 'Staff not found.' });

        if (staff.isVerified) return res.json({ success: false, message: 'Account already verified.' });

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        staff.verifyOtp = otp;
        staff.verifyOtpExpireAt = Date.now() + 3600000; // 1 hour
        await staff.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: staff.email,
            subject: 'Staff Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };       

        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: 'Verification OTP sent successfully!' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Verify Staff Email
export const verifyEmail = async (req, res) => {
    const { staffId, otp } = req.body;

    try {
        const staff = await staffModel.findById(staffId);
        if (!staff) return res.json({ success: false, message: 'Staff not found.' });

        if (staff.verifyOtp !== otp || staff.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        staff.isVerified = true;
        staff.verifyOtp = null;
        staff.verifyOtpExpireAt = null;
        await staff.save();

        return res.json({ success: true, message: 'Email verified successfully!' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const staff = await staffModel.findOne({ email });
        if (!staff) return res.json({ success: false, message: 'Staff not found.' });

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        staff.resetOtp = otp;
        staff.resetOtpExpireAt = Date.now() + 3600000; // 1 hour expiry
        await staff.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: staff.email,
            subject: 'Staff Password Reset OTP',
            text: `Your password reset OTP is: ${otp}. This OTP is valid for 1 hour.`
        };

        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: 'Password reset OTP sent successfully!' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Reset Staff Password
export const resetStaffPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const staff = await staffModel.findOne({ email });
        if (!staff) return res.json({ success: false, message: 'Staff not found.' });

        if (staff.resetOtp !== otp || staff.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        staff.password = hashedPassword;
        staff.resetOtp = null;
        staff.resetOtpExpireAt = null;
        await staff.save();

        return res.json({ success: true, message: 'Password reset successfully!' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = (req, res) => {
    if (req.staff) {
        return res.status(200).json({ success: true, staff: req.staff });
    } else {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
};
