import { Router } from 'express';
import fs from  'fs';
import { v4 as uuidv4 } from 'uuid';
const router  = Router();
const carts = [];

////////////////////////
/// Rutas para carts ///
////////////////////////

router.get('/:cid', async (req, res) => {
    let idC = req.params.cid;
    console.log(idC);
    const car = await cart.getById(idC);
    res.send({status: 200, body: car});
});

router.post('/', async (req, res) => {
    const car = await cart.postCarts();
    res.send({status: 200, body: 'Carrito creado.'})
});

router.post('/:cid/products/:pid', async (req, res) => {
    let idC = req.params.cid;
    let idP = req.params.pid;
    console.log(idC);
    console.log(idP);
    /* const item = req.body; */
    const car = await cart.postCarts(idC, idP);
    res.send({status: 200, body: 'Producto \'' + car + '\' agregado.'})
});

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
            if(!data){
                data={};
                if(!idC){
                    //Si está vacío carritos.json entra por acá
                    //Si está vacío item, es porque no mandaron item. Se guarda el carrito sin productos.
                    let idC = uuidv4();
                    let varCart = { "id": idC, "product": []}
                    data.push(varCart);
                    console.log("Inicializando el archivo carritos.json. Carrito con ID y sin products")
                }else{
                    //Si está vacío carritos.json entra por acá
                    //Si mandaron item se guarda en array products
                /*  data = JSON.parse(data);
                    item.id = data.length + 1;
                    data.push(item); */
                    let product = {"id": idP, "quantity": 1};
                    //let idC = uuidv4();
                    let varCart = { "id": idC, "product": product}
                    data.push(varCart);
                    console.log("Carrito con ID y PRoducts")
                }    
            }else{
                if(!idC){
                    //Si está vacío carritos.json entra por acá
                    //Si está vacío item, es porque no mandaron item. Se guarda el carrito sin productos.
                    let idC = uuidv4();
                    let varCart = { "id": idC, "product": []}
                    data.push(varCart);
                    console.log("Estoy acá!!!!");
                }else{
                    // Actualizo la cantidad del producto en el carrito
                    let cIndex=data.findIndex((c => c.id === idC));
                    let productsCart = data[cIndex];
                    console.log(productsCart);
                    console.log(productsCart.product);
                    let addToCart = productsCart.product;
                    if (cIndex !== -1){
                        // Busco producto por Id y actualizo quantity.
                        let pIndex=addToCart.findIndex((p => p.id === idP));
                        if (pIndex !== -1){
                            let copyProduct = [...data];
                            copyProduct[pIndex] = {...copyProduct[pIndex], id: product.idP, quantity: product.quantity };
                            data = copyProduct;
                        }else{
                            let error = 'Error: El producto que intenta actualizar no existe'; 
                            return error
                        }
                    }else{
                        let error = 'Error: El carrito que intenta actualizar no existe'; 
                        return error
                    }
                            console.log("Carrito con ID y PRoducts")
                }    
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