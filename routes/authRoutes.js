const express = require('express');
const { register, login, forgotPassword, resetPassword, refreshToken, registerPhone, registerRemaining, verifyOtp, } = require('../controllers/authController');
const security = require('../middlewares/security');
const router = express.Router();


router.post('/register-phone', registerPhone);
router.post('/verify-phone', verifyOtp);
router.post('/register', registerRemaining);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken);


module.exports = router;