import { Router } from 'express';
const router  = Router();
import ProductManager from '../dao/dbManagers/products.js';

/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager();
//

////////////////////////////
/// Rutas para productos ///
////////////////////////////

router.get('/', async (req, res) => {   
        // Agregando límite, si no se agrega el límite trae todo los productos, de traer el límite trae la cantidad indicada.
        let limitValue = req.query.limit;
        if (!limitValue ) {
        }else{
            limitValue = parseInt(limitValue); 
        }
        const prod = await product.getAll();
        const prodLimit = prod.slice(0, limitValue);
        res.send({products: prodLimit});
});

router.get('/:pid', async (req, res) => {
    let idP = parseInt(req.params.pid);
    const prod = await product.getById(idP);
    res.send({status: "succes", body: prod});
});

router.post('/', async (req, res) => {
    const item = req.body;
    const prod = await product.postProduct(item);
    res.send({status:"success",payload:prod})
});

router.put('/:pid', async (req, res) => {
    const item = req.body;
    const itemId = req.params.pid;
    const prod = await product.put(item, itemId);
    res.send({status:"success",payload:prod})
})

router.delete('/:pid', async (req, res) => {
    const itemId = req.params.pid;
    const prod = await product.deleteById(itemId);
    res.send({status:"success",payload:prod})
});
//


export default router;