

const mongoose = require('mongoose');


const garageServiceSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    specification:{
        type:[String],
        required:true
    },
    included:{
        type:[String],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    garage:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    serviceSubCategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    serviceCategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

garageServiceSchema.virtual("Garage",{
    ref:"Garage",
    localField:"garge",
    foreignField:"_id"
});

garageServiceSchema.virtual("ServiceSubCategory",{
    ref:"ServiceSubCategory",
    localField:"serviceSubCategory",
    foreignField:"_id"
});

garageServiceSchema.virtual("ServiceCategory",{
    ref:'ServiceCategories',
    localField:"serviceCategories",
    foreignField:"_id"
});


garageServiceSchema.set('toJSON', { virtuals: true });
garageServiceSchema.set('toObject', { virtuals: true });


const garageService = mongoose.model('GarageService', garageServiceSchema);


module.exports = garageService;