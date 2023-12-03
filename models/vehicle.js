const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  carModal: {
    type: String,
    required: true,
    trim: true,
  },
  carNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  license: {
    type: String,
    required: true,
    trim: true,
  },
  problem: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });



const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;