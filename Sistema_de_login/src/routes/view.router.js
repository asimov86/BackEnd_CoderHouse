
import { Router } from 'express';
import messageManager from '../dao/dbManagers/messages.js';
/* import express from 'express'; */
const router  = Router();
/* const router =express.Router(); */

import ProductManager from '../dao/dbManagers/products.js';
import CartManager from '../dao/dbManagers/carts.js';
/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager();
const cart = new CartManager();

const message = new messageManager();

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
        let idC = req.params.cid;
        let car = '';
        car = await cart.getById(idC);
        let carP = [];
        carP =car.products;
        res.render('cart', {cartP: carP, idCart: idC});
});

router.get('/register', (req, res) => {
    res.render('register');
})




// Renderiza el formulario, cuando desde el navegador colocamos http://localhost:8080/login
    // Luego desde el form hay un script /js/login.js que captura el formulario y lo envía vía POST a /api/session/login.
        // Desde sessions.router.js --> (api) /login se verifica si mail y password son correctos, de ser correctos debería renderizar a /products
        // De qué manera hacerlo?
router.get('/login', (req, res) => {
    res.render('login');
})


/* router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) res.render('login', {mensaje: 'Sesión cerrada.'})
        else res.send({status: "No pudo cerrar sesion", body:err});
    });
}) */


router.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se inicio sesion: ${req.session.counter} veces.`);
    }else{
        req.session.counter = 1;
        res.send('Welcome!');
    };

});

export default router;