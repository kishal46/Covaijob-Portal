const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

// ✅ SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { userName, email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // ✅ DO NOT hash password here; it’s done in schema
    const newUser = new User({ userName, email, phoneNumber, password, role });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }]
    });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const userData = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    res.json({ success: true, message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// ✅ FORGOT PASSWORD ROUTE
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${token}&userId=${user._id}`;

    // You can integrate NodeMailer to send this link via email
    res.status(200).json({
      message: 'Reset link sent successfully.',
      resetLink,
    });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

// ✅ RESET PASSWORD ROUTE
router.post('/reset-password', async (req, res) => {
  const { userId, token, newPassword } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ success: false, message: 'Missing user ID or token' });
  }

  try {
    const user = await User.findById(userId);

    if (
      !user ||
      user.resetToken !== token ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ success: false, message: 'Invalid or expired link' });
    }

    user.password = newPassword; // schema will hash this
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
