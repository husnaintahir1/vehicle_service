

const mongoose = require('mongoose');



const serviceCategoriesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },

},{timestamps:true});


serviceCategoriesSchema.set('toJSON', { virtuals: true });
serviceCategoriesSchema.set('toObject', { virtuals: true });


const serviceCategories = mongoose.model('ServiceCategories', serviceCategoriesSchema);

module.exports = serviceCategories;