import mongoose from "mongoose";

//accepts any value
const productSchema = new mongoose.Schema({
    
},
{
    strict:false
});

export const Product =mongoose.model('product',productSchema);