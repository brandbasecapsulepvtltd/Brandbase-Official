const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { sendPasswordResetOTP } = require('../utils/emailService');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_123', {
        expiresIn: '30d'
    });
};

/**
 * @desc    Authenticate admin & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.comparePassword(password))) {
            res.json({
                success: true,
                data: {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    token: generateToken(admin._id)
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

/**
 * @desc    Get current admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id).select('-password');
        if (admin) {
            res.json({
                success: true,
                data: admin
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

/**
 * @desc    Request password reset OTP
 * @route   POST /api/auth/request-password-reset
 * @access  Private
 */
exports.requestPasswordReset = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiry (10 minutes)
        admin.resetOTP = otp;
        admin.resetOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await admin.save();

        // Send OTP email
        await sendPasswordResetOTP(admin.email, otp, admin.name);

        res.json({
            success: true,
            message: 'Verification code sent to your email',
            expiresIn: '10 minutes'
        });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send verification code',
            error: error.message
        });
    }
};

/**
 * @desc    Update admin password with OTP verification
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword, otp } = req.body;

    try {
        const admin = await Admin.findById(req.user._id);

        // Verify current password
        if (!(await admin.comparePassword(currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Verify OTP
        if (!admin.resetOTP || !admin.resetOTPExpires) {
            return res.status(400).json({
                success: false,
                message: 'Please request a verification code first'
            });
        }

        if (admin.resetOTP !== otp) {
            return res.status(401).json({
                success: false,
                message: 'Invalid verification code'
            });
        }

        if (Date.now() > admin.resetOTPExpires) {
            return res.status(401).json({
                success: false,
                message: 'Verification code has expired. Please request a new one'
            });
        }

        // Update password
        admin.password = newPassword;
        admin.resetOTP = undefined;
        admin.resetOTPExpires = undefined;
        await admin.save();

        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
