import { Router } from 'express';
import { messageModel } from '../models/message.model.js';
const router  = Router();

////////////////////////////
/// Rutas para productos ///
////////////////////////////
export default class Messages{

    post = async (item)=>{
        console.log(item);
        let{user, message} =item;
        if ( !message || !user)
        res.send ({status :"error" , error:" Info Incompleta"})
        let result =await messageModel.create({
            user,
            message
        })
        return result
    }
}