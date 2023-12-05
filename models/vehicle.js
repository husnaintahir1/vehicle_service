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
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, { timestamps: true });


vehicleSchema.virtual("user", {
  ref: "User",
  localField: 'addedBy',
  foreignField: '_id',
});

vehicleSchema.set('toJSON', { virtuals: true });
vehicleSchema.set('toObject', { virtuals: true });


const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;