import { Router } from 'express';
import fs from  'fs';
import { v4 as uuidv4 } from 'uuid';
import { cartModel } from '../models/cart.model.js';
import { productModel } from '../models/product.model.js';
const router  = Router();
const carts = [];

////////////////////////
/// Rutas para carts ///
////////////////////////

router.get('/:cid', async (req, res) => {
    /* let idC = req.params.cid;
    console.log(idC);
    const car = await cart.getById(idC);
    res.send({status: 200, body: car}); */
    try{
        let idC = req.params.cid;
        console.log(idC);
        let carts = await cartModel.find({_id:idC});
        res.send({ result : "sucess" ,payload:carts})
    }catch(error){
        console.log ("No se pudo traer los carritos " + error)
    }
});

router.post('/', async (req, res) => {
    /* const car = await cart.postCarts();
    res.send({status: 200, body: 'Carrito creado.'}) */
    try{
     let products = [];
        let carts = await cartModel.create({products});
        res.send({ result : "sucess" ,payload:carts});
    }catch(error){
        console.log ("No se pudo crear el carrito " + error)
    }

});

router.post('/:cid/products/:pid', async (req, res) => {
    
    /* const item = req.body; */
    /* const car = await cart.postCarts(idC, idP);
    res.send({status: 200, body: 'Producto con id: \'' + idP + '\' agregado.'}) */
    try{
        let idC = req.params.cid;
        let idP = req.params.pid;
        console.log(idC);
        console.log(idP); 

        // Busco que ambos existan, carrito y producto.
        // Busco el carrito
        // Busco el producto dentro de products en el carrito.
        // Si existe le aumento la cantidad sino agrego el id del producto y la cantidad en 1.

        let product = await productModel.find({_id:idP});
        if (!product) {
            return res.status(404).json({error: true , message:'El producto no existe.'});
        }
        let cart = await cartModel.find({_id: idC});
        console.log(cart);
        if (!cart) {
            return res.status(404).json({error: true , message:'El carrito no existe.'});
        }else{
            //Buscamos si el carrito tiene productos.
            if(!cart.products){
                console.log("Carrito vacio")
            }
            let carts = await cartModel.updateOne({_id: idC}, {$set:{products: {product: idP, quantity:1}}});
            
            res.send({ result : "sucess" ,payload:carts});
        }

    }catch(error){
        console.log ("No se pudo agregar el producto al carrito " + error)
    }    

});
/* db.carts.updateOne({_id: ObjectId("63e257f4cae487e581d06f6f")}, {$set: { products: {product: 23263, quantity: 2} } } ) */
//

////////////////////////
/// Clase y métodos ////
////////////////////////
class CartManager {
    
    constructor(path){
            this.path=path;
            this.id = 0;
            this.carts = [];
            this.getCarts();
    }


    async getAll(){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            return data;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    async getById(idC){
        console.log(idC);
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            let getData = data.find(c => c.id === idC);
            let error = (typeof(getData) === "undefined") ? 'error: Carrito no encontrado' : 'Carrito encontrado';
            console.error (error);
            return getData;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    getCarts(){
        return this.carts;
    }
    
    async postCarts(idC, idP){
        // Si está vacío el array carts, id = 0 sino id = id++; 
        let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
        data = JSON.parse(data);
        /* let cartP = []; */
        let quantity = 1;
        try {
            let products = [];
                // Ya existen otros carritos en el archivo carritos.json. Es decir, el archivo carritos.json no está vacío.
                // Se crea otro carrito sin o con producto.
                if(!(idC && idP)){
                    // Se crea otro carrito sin producto
                   let idC = uuidv4();
                   let varCart = { "id": idC, "product": products}
                   data.push(varCart);
                   console.log("C")
                }else{
                    // Se crea otro carrito con producto o se agrega o modifica otro producto
                    let product = {"id": idP, "quantity": 1};
                    let carrito = {};
                        //Busco  el carrito por id
                        carrito = data.find(carrito => carrito.id === idC);
                        //saco el carrito del array data
                        data = data.filter(carrito => carrito.id !== idC);
                        let cartProducts=carrito.product;
                        if(!carrito){
                            //No existe el carrito, entonces se agrega
                            products.push(product);
                        }else{
                            //Existe el carrito, entonces verifico si el producto ya existe como producto dentro del carrito.Si existe aumento su quantity en 1.
                            let findProduct = []; 
                            findProduct = cartProducts.find(p=>p.id === idP);
                            if(findProduct){
                                //saco product del array products y actualizo quantity
                                cartProducts = cartProducts.filter(p=> p.id !== idP);
                                let quantityP=findProduct.quantity;
                                let addProduct = quantityP + 1;
                                product = {"id": idP, "quantity": addProduct};
                                // Agrego a carrito de nuevo con los products y sus cantidades actualizadas
                                cartProducts.push(product);
                            }else{
                                //Si no se consigue el producto entonces se agrega un nuevo producto en el mismo carrito encontrado.
                                // Agrego a carrito
                                cartProducts.push(product);
                            }
                        }        
                    let varCart = { "id": idC, "product": cartProducts}
                    data.push(varCart);
                    console.log("D")
                }         
            await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
            return cart.idC;
        } catch(error) {
            console.log(`Hubo un error ${error}`);

        }
    }

}
//

/////////////////
/// Instancia ///
/////////////////
const cart = new CartManager('carritos');
//

export default router;