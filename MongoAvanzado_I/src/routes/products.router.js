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
        let page =req.query.page;
        let category = req.query.query;
        page = parseInt(page); 
        if (!page) {
            page = 1;
        }else{
            page = parseInt(page); 
        }
        if (!limitValue || limitValue === "") {
            limitValue = 10;
        }else{
            limitValue = parseInt(limitValue); 
        }
        const prod = await product.getAll(page, limitValue, category);
        const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = prod;
        const products = docs;
        console.log( "hasPrevPage:" + hasPrevPage + ", hasNextPage:" + hasNextPage + ", nextPage:" + nextPage + ", prevPage:" + prevPage + ", totalPages:" + totalPages + ", prevLink:" + prevLink + ", nextLink:" + nextLink)
        res.render('home',{
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            prevLink,
            nextLink
        });
});

router.get('/:pid', async (req, res) => {
    let idP = req.params.pid;
    console.log(idP); 
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