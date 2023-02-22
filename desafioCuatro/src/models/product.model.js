import mongoose from 'mongoose';

const productCollection = 'products';
const productSchema= new mongoose.Schema({
    title:{
        type:String,
        unique: true
    },
    description:String,
    category:String,
    price:Number,
    status: Boolean,
    thumbnail:String,
    code:String,
    stock:Number
})

export const productModel =mongoose.model(productCollection,productSchema);