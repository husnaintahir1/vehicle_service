const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateRegisterUser, validateLogin, validateRegisterUserPhone, validateOtp } = require('../validations/authValidation');
const { sendVerificationCode } = require('../utils/twilio');
const { forgotPaswordLinkSend } = require('../utils/nodemailer');
require('dotenv').config();



const registerPhone = async (req, res) => {
  try {
    const { error } = validateRegisterUserPhone(req.body);
    if(error){
      return res.status(400).send({ success: false, message: error.details[0].message });
    }
    const { phone } = req.body;
    const isExist = await User.findOne({ phone });
    if(isExist){
      return res.status(400).send({ success: false, message: "Phone number already registered" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = new User({ phone, otp });
    await user.save();
    const sid = await sendVerificationCode(phone, otp);
    return res.status(201).send({ success:true, data: { _id: user._id, phone: user.phone, sid, message: 'Verification code send', } });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message, });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { error } = validateOtp(req.body);
    if(error){
      return res.status(400).send({ success: false, message: error.details[0].message });
    }
    const { otp, phone } = req.body;
    const user = await User.findOne({ phone });
    if(!user){
      return res.status(400).send({ success: false, message: "Phone number not registered" });
    }
    
    if(user.otp !== otp){
      return res.status(400).send({ success: false, message: "wrong otp" });
    }

    user.otp = null;
    user.phone_verify = true;
    await user.save();
    return res.status(200).send({ success:true, data: { user, message: 'User successfully registered', }});
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message, });
  }
};

const registerRemaining = async (req, res) => {
  try {
    const { error } = validateRegisterUser(req.body);
    if(error){
      return res.status(400).send({ success: false, message: error.details[0].message });
    }
    const { name, email, password, phone } = req.body;
    const isExist = await User.findOne({ email });
    if(isExist){
      return res.status(400).send({ success: false, message: "Email already registered" });
    }

    // const user = await User.findOne({ phone });
    // if(!user){
    //   return res.status(400).send({ success: false, message: "Phone number not registered" });
    // }

    // user.name = name;
    // user.email = email;
    // user.password = password;

    // UnComment abpve code and rem below when phone register
    const user = new User(req.body);
    await user.save();
    res.status(200).send({ success: true, data: { user, message: 'User successfully Registered', }});
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message, });
  }
};

const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if(error){
    return res.status(400).send({ success: false, message: error.details[0].message });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ success: false, message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);     // , { expiresIn: '1h' }
  res.send({ success: true, data: { user }, token  });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // const resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
  
    // await User.findOneAndUpdate(
    //   { email },
    //   { resetToken, resetTokenExpiration }
    // );

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();
  
    await forgotPaswordLinkSend(otp, user.email);
  
    res.send({ success: false, message: 'Password reset email sent' });
};
  
const resetPassword = async (req, res) => {
    const { otp, email, password } = req.body;
  
    try {
      // Verify the token first
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // const userId = decoded.userId;
  
      // Find the user by ID and ensure the token hasn't expired
      const user = await User.findOne({
        email,
        otp,
      });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid otp or has expired' });
      }
  
      user.password = password;
      user.otp = null;
      await user.save();
  
      res.send({ success: true, message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Error while reseting password' });
    }
};
  

const refreshToken = async (req, res) => {
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
  

module.exports = {
  login,
  registerPhone,
  verifyOtp,
  registerRemaining,
  forgotPassword,
  resetPassword,
  refreshToken,
}