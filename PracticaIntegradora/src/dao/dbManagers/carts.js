import { Router } from 'express';
import { cartModel } from '../models/cart.model.js';
import { productModel } from '../models/product.model.js';
const router  = Router();

////////////////////////
/// Rutas para carts ///
////////////////////////
export default class Carts{
    constructor(){
        console.log("Trabajando con MongoDB")
    }
    getById = async(idC) => {
        try{
            console.log(idC);
            let cart = await cartModel.find({_id:idC});
            return cart
        }catch(error){
            console.log ("No se pudo traer los carritos " + error)
        }
    };

    postCarts = async() => {
        try{ 
            let products = [];
            let cart = await cartModel.create({products});
            return cart
        }catch(error){
            console.log ("No se pudo crear el carrito " + error)
        }
    };

    post = async(idC, idP) => {
        try{
            console.log(idC);
            console.log(idP); 

            // Busco que ambos existan, carrito y producto.
            // Busco el carrito
            // Busco el producto dentro de products en el carrito.
            // Si existe le aumento la cantidad sino agrego el id del producto y la cantidad en 1.
// Ejemplo
/* ecommerce> db.carts.find().pretty()
[
  {
    _id: ObjectId("63e2f3aecae487e581d06f70"),
    products: [
      { product: 23233, quantity: 4 },
      { product: 23263, quantity: 6 }
    ]
  }
] */
    /* db.carts.updateOne({_id:ObjectId("63e2f3aecae487e581d06f70"), products: {$elemMatch: {product: {$eq:23263}}}}, {$set:{"products.$.quantity":6}}) */
            let quantity = 1; 
            let product = await productModel.find({_id:idP});
            if (!product) {
                return res.status(404).json({error: true , message:'El producto no existe.'});
            }
            let cart = await cartModel.find({_id: idC});
            console.log(cart.products);
            if (!cart) {
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
                //Buscamos si el carrito tiene productos.
                if(!cart.products){
                    console.log("Carrito vacio");
                    let carts = await cartModel.updateOne({_id: idC}, {$set:{products: {product: idP, quantity:1}}});
                    return carts
                }else{
                    console.log("Carrito con productos");
                    let carts = await cartModel.updateOne({_id: idC, products: {$elemMatch: {product: {$eq:idP}}}}, {$inc:{"products.$.quantity":quantity}});
                    return carts
                }
            }
        }catch(error){
            console.log ("No se pudo agregar el producto al carrito " + error)
        }    
    }
}
