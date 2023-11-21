const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully', userId: user.id });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, userId: user.id });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
  
    await User.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiration }
    );
  
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Please click the link below to set a new password.</p>
        <a href="http://localhost:3000/reset/${resetToken}" style="background-color: #0044cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      </div>`
    });
  
    res.send('Password reset email sent.');
  };
  
  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
      // Verify the token first
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      // Find the user by ID and ensure the token hasn't expired
      const user = await User.findOne({
        _id: userId,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
  
      // Update the user's password and clear the reset token fields
      await User.updateOne(
        { _id: userId },
        { 
          password: hashedPassword, 
          resetToken: null, 
          resetTokenExpiration: null 
        }
      );
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error resetting password' });
    }
  };
  

  exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token is required' });
    }
  
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user found with this token' });
      }
  
      // Check if the received refreshToken matches the one stored in the database
      if (user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      // Generate new access token
      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // or your preferred expiration time for access tokens
      );
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
  };
  