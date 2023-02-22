import { productModel } from "./dao/models/product.model.js";
import { cartModel } from "./dao/models/cart.model.js";
import mongoose from "mongoose";
import { MONGODB_URI } from "./public/config.js";

const enviroment = async () => {
    await mongoose.connect(MONGODB_URI);
    // Indexación
      let response = await productModel.find().explain('executionStats');
    console.log(response);
    let response1 = await productModel.find({category: 1}).explain('executionStats');
    console.log(response1); 
    // Crear index para category y status



    // Para ampliar este tema leer: https://www.percona.com/blog/mongodb-investigate-queries-with-explain-index-usage-part-2/
    // Population 
    /* let cart = await cartModel.findOne({_id:"63ece13d2b8829f514cc6b96"});
    console.log(cart);
    cart.products.push({product:"63e684d01cda594d22846f4e"});
    let result = await cartModel.updateOne({_id:"63ece13d2b8829f514cc6b96"}, cart);
    console.log(result); 
    cart = await cartModel.findOne({_id:"63ece13d2b8829f514cc6b96"}).populate('products.product');;
    console.log(JSON.stringify(cart, null, '\t'));*/

    // Aggregation
    /* let products = await productModel.aggregate([
        {
            $match : {category: 'Hamburguesa'}
        },
        {
            $group : {_id: '$title', totalQuantity: {$sum: "$stock"}}
        },
        {
            $sort : {totalQuantity: -1}
        },
        {
            $group : {_id:1, products: {$push: "$$ROOT"}}
        },
        {
            $project: {"_id":0, products: "products"}
        },
        {
            $merge: {
                into: 'reports'
            }
        }
    ])

    console.log(products); */
    // Paginate
    /* let cart = await cartModel.paginate({limit: 10, nextPage: 2});
    console.log(cart); */
    /* let carts = await cartModel.findOne({_id:"63e301b02523ec6d5ca55cb0"});
    console.log(carts);
let idC = "63e301b02523ec6d5ca55cb0";
let idP = "63e2c076a6c6dca3600e0487";
console.log("_________________________________") */
    /* let cartEliminado = await cartModel.updateOne(
        {
            _id: idC,
          },
          {
            $pull: {
              products: {
                 product: idP,
              },
            },
          }
    ); */
  /*   let cart = await cartModel.find({_id: idC});
    let productsCart = cart[0].products;
    let cartEmpty = productsCart.length;
    console.log(cartEmpty);
    let cartEliminado = await cartModel.updateOne(
        {
            _id: idC,
          },
          {
            $pullAll: {
              products: [],
            },
          }
    );
    console.log(cartEliminado);
    carts = await cartModel.findOne({_id:"63e301b02523ec6d5ca55cb0"});
    console.log(carts); */

    /* const prod = await productModel.paginate({ limit:10 , lean:true});
    console.log(prod); */
}

enviroment();