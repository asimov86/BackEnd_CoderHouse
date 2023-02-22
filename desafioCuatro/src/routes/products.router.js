import { Router } from 'express';
import fs from  'fs';
import { productModel } from '../models/product.model.js';
const router  = Router();
const products = [];

////////////////////////////
/// Rutas para productos ///
////////////////////////////

router.get('/', async (req, res) => {   
        // Agregando límite, si no se agrega el límite trae todo los productos, de traer el límite trae la cantidad indicada.
        /* let limitValue = req.query.limit;
        if (!limitValue ) {
        }else{
            limitValue = parseInt(limitValue); 
        }
        const prod = await product.getAll();
        const prodLimit = prod.slice(0, limitValue);
        res.send({products: prodLimit}); */
        try{
            let products = await productModel.find()
            res.send({ result : "sucess" ,payload:products})
        }catch(error){
            console.log ("No pude traer productos " + error)
        }
});

router.get('/:pid', async (req, res) => {
    let idP = parseInt(req.params.pid);
    const prod = await product.getById(idP);
    res.send({status: 200, body: prod});
});

/* router.post('/', async (req, res) => {
    const item = req.body;
    const prod = await product.postProduct(item);
    res.send({status: 200, body: 'Producto \'' + prod + '\' agregado.'})
}); */

router.post ('/',async (req,res)=>{

    let{title, description, category, price, status, thumbnail, code, stock} =req.body;
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
    res.send({status:"success",payload:result})
})

router.put('/:pid', async (req, res) => {
    let item = req.body;
    let itemId = parseInt(req.params.pid);
    const prod = await product.put(item, itemId);
    res.send({body: prod});
})

router.delete('/:pid', async (req, res) => {
    let itemId = parseInt(req.params.pid);
    const prod = await product.deleteById(itemId);
    res.send({body: prod});
});
//

////////////////////////
/// Clase y métodos ////
////////////////////////
class ProductManager {
    
    constructor(path){
            this.path=path;
            this.id = 0;
            this.products = [];
            this.getProducts();
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

    async getById(idP){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            let getData = data.find(p => p.id === idP);
            let error = (typeof(getData) === "undefined") ? 'error:producto no encontrado' : 'Producto encontrado';
            console.error (error);
            return getData;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    getProducts(){
        return this.products;
    }
    
    async postProduct(item){
        // Si está vacío el array product, id = 0 sino id = id++; 
        let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
        try {
            if(!data){
                this.id = this.id + 1;
                this.products.push({
                    id: this.id, 
                    title: title, 
                    description: description, 
                    category: category, 
                    price: price,
                    status: status,
                    thumbnail: thumbnail, 
                    code:code, 
                    stock: stock
                }); 
                data = [products];
            }else{
                data = JSON.parse(data);
                item.id = data.length + 1;
                data.push(item);
            }
            await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
            return item.title;
        } catch(error) {
            console.log(`Hubo un error ${error}`);

        }
    }

    async put(item, itemId){ 
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            // Busco producto por Id y actualizo sin cambiar Id.
            let pIndex=data.findIndex((product => product.id === itemId));
            if (pIndex !== -1){
                let copyProduct = [...data];
                copyProduct[pIndex] = {...copyProduct[pIndex], title: item.title, description: item.description, category: item.category, price: item.price, status:item.status, thumbnail: item.thumbnail, code: item.code, stock: item.stock};
                data = copyProduct;
                await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
                return data;
            }else{
                let error = 'Error: El producto que intenta actualizar no existe'; 
                return error
            }
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    async deleteById(itemId){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            // Busco producto por Id y elimino sin cambiar Id.
            let getProduct = data.find(p => p.id === idP);
            if(!getProduct){
                let error = 'El producto que intenta eliminar no existe.';
                return error
            }else{
                const newData = data.filter((product) => product.id !== itemId);
                await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(newData));
                return newData
            }	
            
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

}
//

/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager('productos');
//

export default router;