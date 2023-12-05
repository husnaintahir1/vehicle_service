

const mongoose = require("mongoose");


const brandsSchema= new mongoose.Schema({
    title:{
        type:String,
        
    },
    image:{
        type:String
    },
});


brandsSchema.set('toJSON', { virtuals: true });
brandsSchema.set('toObject', { virtuals: true });


const Brands = mongoose.model('Brands', brandsSchema);

module.exports =  Brands;