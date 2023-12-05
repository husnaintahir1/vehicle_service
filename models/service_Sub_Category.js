

const mongoose = require('mongoose');

const serviceSubCategorySchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    serviceCategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }

},{timestamps:true});


serviceSubCategorySchema.virtual("ServiceCategory",{
    ref:"ServiceCategories",
    localField:"serviceCategory",
    foreignField: '_id'
});


serviceSubCategorySchema.set('toJSON', { virtuals: true });
serviceSubCategorySchema.set('toObject', { virtuals: true });

const serviceSubCategory = mongoose.model('serviceSubCategory',serviceSubCategorySchema);

module.exports= serviceSubCategory