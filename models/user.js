const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    required: false,
  },
  phone_verify: {
    type: Boolean,
    required: true,
    default: false,
  },
  otp: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  resetToken: String,
  resetTokenExpiration: Date
}, { timestamps: true });


userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  delete userObject.otp;
  delete userObject.resetToken;
  delete userObject.resetTokenExpiration;
  return userObject;
}


userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

const User = mongoose.model('User', userSchema)

module.exports = User;