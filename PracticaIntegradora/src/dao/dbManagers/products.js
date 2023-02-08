import { Router } from 'express';
import { productModel } from '../models/product.model.js';
const router  = Router();

////////////////////////////
/// Rutas para productos ///
////////////////////////////
export default class Products{
    constructor(){
        console.log("Trabajando con MongoDB")
    }
    getAll = async () => {   
            try{
                let products = await productModel.find();
                return products
            }catch(error){
                console.log ("No pude traer productos " + error)
            }
    };

    get = async () => {
        let idP = parseInt(req.params.pid);
        const prod = await productModel.getById(idP);
        return prod
    };

    postProduct = async (item)=>{
        let{title, description, category, price, status, thumbnail, code, stock} =item;
        if (!title || !description || !category || !price || !status || !thumbnail || !code || !stock)
        res.send ({status :"error" , error:" Info Incompleta"})
        let result =await productModel.create({
            title,
            description,
            category,
            price,
            status,
            thumbnail,
            code,
            stock
        })
        return result
    }

    put = async (item, itemId) => {
        let{title, description, category, price, status, thumbnail, code, stock} =item;
        console.log(itemId);
        let existProduct = await productModel.find({_id: itemId});
        if(existProduct){
            const prod = await productModel.updateOne(
                {_id: itemId}, 
                {$set:{
                    title:title, 
                    description:description, 
                    category:category, 
                    price:price, 
                    status:status, 
                    thumbnail:thumbnail, 
                    code:code, 
                    stock:stock}
                }
            );
            return prod
        }   
    }

    deleteById = async (itemId) => {
        const prod = await productModel.deleteOne({_id:itemId});
        return prod
    };

}