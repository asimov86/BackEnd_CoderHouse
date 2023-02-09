

import messageManager from '../dao/dbManagers/messages.js';
import express from 'express';

const router =express.Router();


const message = new messageManager();

router.get('/', async (req,res)=>{
    res.render('home');
})

router.post('/', async (req,res)=>{
    const item = req.body;
    const mess =  await message.post(item);
    res.send({status:"success",payload:mess})
})
export default router;