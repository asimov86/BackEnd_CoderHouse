
import { Router } from 'express';

/* import express from 'express'; */
const router  = Router();
/* const router =express.Router(); */


/////////////////
/// Instancia ///
/////////////////


router.get('/products', async (req,res)=>{
    // Agregando límite, si no se agrega el límite trae todos los productos, de traer el límite trae la cantidad indicada (10). Lo mismo con el resto de parámetros.
    const limitValue = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    let customQuery = req.query.query;
    const sort = parseInt(req.query.sort) || 1;
    if(!customQuery){
        customQuery = '';
    }else{
        customQuery = customQuery.toLowerCase();
    }

        const prod = await product.getAll(page, limitValue, sort, customQuery);
        const {docs,hasPrevPage,hasNextPage,nextPage,prevPage,totalPages,prevLink,nextLink} = prod;
        res.render( 'home', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            prevLink,
            nextLink,
            limitValue,
            customQuery,
            sort
        });
})

router.get('/carts/:cid', async (req, res) => {
    /* try {
        let idC = req.params.cid;
        console.log(idC);
        let car = '';
        car = await cart.getById(idC);
        let carP = [];
        if(car !== '') {
            console.log(car);
            carP =car.products;
            console.log(carP);
            console.log(carP[0].product);
            console.log(carP[0].quantity); 
            res.render('cart', {products: carP});
        }else{
            
            console.log("Nada");
        }
    } catch (error) {
        console.log ("No se pudo traer los carritos " + error)
    } */
    
   
        let idC = req.params.cid;
        let car = '';
        car = await cart.getById(idC);
        let carP = [];
        carP =car.products;
        res.render('cart', {cartP: carP, idCart: idC});
});

export default router;