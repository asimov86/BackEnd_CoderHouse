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
    res.send({ result : "sucess" ,payload:car})
});

router.post('/', async (req, res) => {
    const car = await cart.postCarts();
    res.send({ result : "sucess" ,payload:car})
});

router.post('/:cid/products/:pid', async (req, res) => {
    let idC = req.params.cid;
    let idP = req.params.pid;
    const car = await cart.post(idC, idP);
    res.send({ result : "sucess" ,payload:car});
});

router.put('/:cid/products/:pid', async (req, res) => {
    let idC = req.params.cid;
    let idP = req.params.pid;
    const item = req.body;
    const car = await cart.putProducts(idC, idP, item);
    res.send({ result : "success" ,payload:car});
});

router.put('/:cid', async (req, res) => {
    let idC = req.params.cid;
    const items = req.body;
    const car = await cart.putProduct(idC, items);
    res.send({ result : "success" ,payload:car});
});

router.delete('/:cid/products/:pid', async (req, res) => {
    let idC = req.params.cid;
    let idP = req.params.pid;
    const car = await cart.deleteProduct(idC, idP);
    res.send({ result : "sucess" ,payload:car});
});

router.delete('/:cid', async (req, res) => {
    let idC = req.params.cid;
    const car = await cart.deleteProducts(idC);
    res.send({ result : "sucess" ,payload:car});
});

//
export default router;

//



