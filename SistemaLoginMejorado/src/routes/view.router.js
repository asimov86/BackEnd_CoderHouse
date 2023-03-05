
import { Router } from 'express';
import { authSession } from '../middleware/authSession.js';

const router  = Router();

import ProductManager from '../dao/dbManagers/products.js';
import CartManager from '../dao/dbManagers/carts.js';
/////////////////
/// Instancia ///
/////////////////
const product = new ProductManager();
const cart = new CartManager();

router.get('/products', authSession, async (req,res)=>{
    const {email, name, role, age} = req.session.user;
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

        // Para la paginación
        let arr = [];
        for (let i = 0; i < totalPages; i++) {
            arr[i]=i + 1;
          }
        //
        console.log(arr);
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
            sort,
            email,
            name,
            age,
            role,
            arr
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
});
// Renderiza el formulario, cuando desde el navegador colocamos http://localhost:8080/login
    // Luego desde el form hay un script /js/login.js que captura el formulario y lo envía vía POST a /api/session/login.
        // Desde sessions.router.js --> (api) /login se verifica si mail y password son correctos, de ser correctos redirecciona a /products
        // se agregó un middleware (./src/middleware/authSession.js) para prevenir que los usuarios No logeados ingresen a la seccion de products y otras secciones.

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/resetPassword', (req, res) => {
    res.render('resetPassword');
});

export default router;