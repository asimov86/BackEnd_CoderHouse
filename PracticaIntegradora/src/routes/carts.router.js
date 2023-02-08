import { Router } from 'express';
import CartManager from "../dao/dbManagers/carts.js";
const router  = Router();


/////////////////
/// Instancia ///
/////////////////
const  cart = new CartManager();
//


////////////////////////
/// Rutas para carts ///
////////////////////////

router.get('/:cid', async (req, res) => {
    let idC = req.params.cid;
    console.log(idC);
    const car = await cart.getById(idC);
    // res.send({status: 200, body: car});
    res.send({ result : "sucess" ,payload:car})
});

router.post('/', async (req, res) => {

    const car = await cart.postCarts();
    // res.send({status: 200, body: 'Carrito creado con id: ' + car.id});
    res.send({ result : "sucess" ,payload:car})
});

router.post('/:cid/products/:pid', async (req, res) => {
    let idC = req.params.cid;
    let idP = req.params.pid;
    console.log(idC);
    console.log(idP);
    /* const item = req.body; */
    const car = await cart.post(idC, idP);
    // res.send({status: 200, body: 'Producto \'' + car + '\' agregado.'})
    res.send({ result : "sucess" ,payload:car});
});

//
export default router;

//



