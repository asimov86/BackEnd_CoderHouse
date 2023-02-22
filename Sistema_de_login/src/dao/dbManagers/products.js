import { Router } from 'express';
//import { Aggregate } from 'mongoose';
import { productModel } from '../models/product.model.js';
const router  = Router();

////////////////////////////
/// Rutas para productos ///
////////////////////////////
export default class Products{
    constructor(){
        console.log("Trabajando con MongoDB")
    }
    getAll = async (page, limitValue, sort, customQuery) => {   
        try{ 
            console.log(customQuery);
            if(!customQuery){
                const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = await productModel.paginate({}, {limit:limitValue , page:page,  sort: { price: sort }, lean:true});
                return {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink}
            }else{
                const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = await productModel.paginate({category: customQuery}, {limit:limitValue , page:page,  sort: { price: sort }, lean:true});
                return {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink}
            }
            
        }catch(error){
            console.log ("No se pudo traer los productos. " + error)
        } 
    };
// Seguir investigando lo de la query con paginate

    // Ver este video https://www.youtube.com/watch?v=iwZ8X0ceyP8
    //https://www.youtube.com/watch?v=0T4GsMYnVN4

    getById = async (idP) => {
        try{
            const prod = await productModel.find({_id:idP});
            return prod
        }catch{
            console.log ("No se pudo traer el producto." + error)
        } 
    }; 

    postProduct = async (item)=>{
        let{title, description, category, price, status, thumbnail, code, stock} =item;
        if (!title || !description || !category || !price || !status || !thumbnail || !code || !stock)
        res.send ({status :"error" , error:" Info Incompleta"})
        // Convertir la categoría a minúscula.
        category = category.toLowerCase();
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
        try {
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
        } catch (error) {
            console.log ("No se pudo insertar el producto. " + error)
        }
       
    }

    deleteById = async (itemId) => {
        try {
            const prod = await productModel.deleteOne({_id:itemId});
            return prod 
        } catch (error) {
            console.log ("No se pudo borrar el producto. " + error)
        }
        
        
    };

}