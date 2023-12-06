const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
}, { timestamps: true });


const UserAddress = mongoose.model('UserAddress', userAddressSchema)

module.exports = UserAddress;