import { Router } from "express";
import Carts from "../dao/dbManagers/carts.js"
import Products from "../dao/dbManagers/product.js"


const router = Router();
const cartsManager =new Carts();
const productsManager =new Products();


router.get('/',async (req,res)=> {
    let users =await cartsManager.getAll();
    console.log(users);
    res.render ('users',{users})
})

router.get('/api/products',async (req,res)=> {
    let products =await productsManager.getAll();
    console.log(products);
    // res.render (products,{product})
    res.render('home', { 
        product: product,
        listExists: true,});
})

export default router;