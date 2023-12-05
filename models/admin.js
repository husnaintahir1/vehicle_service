

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminSchema = new mongoose({
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
},{timestamps:true});


adminSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
  });


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;