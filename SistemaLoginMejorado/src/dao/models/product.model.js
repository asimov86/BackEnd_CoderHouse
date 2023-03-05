import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';
const productSchema= new mongoose.Schema({
    title:{
        type:String,
        unique: true,
    },
    description:String,
    category:{
        type:String,
        index:true
    },
    price:Number,
    status: {
        type:Boolean,
        index:true
    },
    thumbnail:String,
    code:String,
    stock:Number
})
productSchema.plugin(mongoosePaginate);
export const productModel =mongoose.model(productCollection,productSchema);