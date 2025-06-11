require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter ready');
  }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetURL = `http://localhost:3000/reset-password?token=${token}`;

    // Send Email
    await transporter.sendMail({
      from: `"Support" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>Hello ${user.userName || 'User'},</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p><strong>Link expires in 1 hour.</strong></p>
        <p>If you didn’t request this, ignore this email.</p>
      `,
    });

    res.json({ success: true, message: 'Reset link sent to your email.' });

  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // check token not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Optional: send confirmation email
    await transporter.sendMail({
      from: `"Support" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: 'Password Changed Successfully',
      html: `
        <p>Hello ${user.userName || 'User'},</p>
        <p>Your password was successfully updated.</p>
        <p>If you did not perform this action, please contact support immediately.</p>
      `,
    });

    res.json({ success: true, message: 'Password reset successful' });

  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
