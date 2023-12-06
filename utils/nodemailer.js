const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});


export const sendOtpByEmail = async (otp, email) => {
    await transporter.sendMail({
        to: email,
        subject: 'Verification Code',
        html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2>Your Verification Code is ${otp}</h2>
          <p>Please do not disclose this code to anyone, also If you did not request this, please ignore this email.</p>
        </div>`
    });
}

export const forgotPaswordLinkSend = async (otp, email) => {
    await transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <h2>Password Reset Request</h2>
                <p>You requested a password reset. Your OTP is ${otp}</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        });
}


// <a href="${process.env.SERVER_BASE_URL}/reset-password?token=${resetToken}" style="background-color: #0044cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>