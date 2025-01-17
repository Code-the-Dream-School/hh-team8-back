const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../utils/emailService');

const prisma = new PrismaClient();

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const tokenExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Update user with token and expiry
        await prisma.users.update({
            where: { email },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: tokenExpiry,
            },
        });

        // Send reset email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${resetToken}`;
        const message = `
            <h2>Password Reset</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetURL}">${resetURL}</a>
        `;

        await sendEmail(user.email, 'Password Reset Request', message);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {

    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find the user with the token and check expiry
        const user = await prisma.users.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: { gt: new Date() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password and clear token
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.update({
            where: { user_id: user.user_id },
            data: {
                password_hash: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};