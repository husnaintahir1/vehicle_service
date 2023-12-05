const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    timing: {
        type: String,
        required:true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    services:{
        type:[String],
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
});

garageSchema.index({ 'location.coordinates': '2dsphere' });

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;
