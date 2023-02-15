import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const productCollection = 'products';
const productSchema= new mongoose.Schema({
    title:{
        type:String,
        unique: true,
        index:true
    },
    description:String,
    category:String,
    price:Number,
    status: Boolean,
    thumbnail:String,
    code:String,
    stock:Number
})
productSchema.plugin(mongoosePaginate);
export const productModel =mongoose.model(productCollection,productSchema);