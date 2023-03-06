import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;
    let role = 'user';
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(404).send({status: 'error', error: 'Valores incompletos.'});
    }
    const exists = await userModel.findOne({email: email});
    if(exists) {return res.status( 400 ).send({status: 'error', error: 'El usuario ya existe.'});}
    // Agregado de rol al crear usuario
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        role = 'admin';
    }
    const result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password:createHash(password),
        role
    })
    res.send({status: 'success', payload: result});

});


router.get('/github', passport.authenticate('github', {scope: ['user:email']}, async(req, res)=>{}));

router.get('/', passport.authenticate('github', {failureRedirect: '/login'}, async(req, res)=>{
    req.session.user = req.user, 
    res.redirect('/');
}));


/* router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(404).send({status: 'error', error: 'Valores incompletos.'});
    }

    const user = await userModel.findOne({email:email}, {email:1, first_name:1, last_name: 1, age: 1, password:1, roles: 1});
    if(!user) {
        return res.status(403).send({status: 'error', error: 'Usuario no encontrado'});
    }
    if(!isValidPassword(user, password)) return res.status( 403 ).send({status: 'error', error: 'Contraseña invalida.'});
    delete user.password; // Para que no guarde la contrase;a en la sesión
    if (user.role === 'admin'){ 
        req.session.admin=true;
    }
    req.session.user = user;
    res.send({status:'Success', payload:user});
}); */

router.post('/resetPassword', async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send({status: 'error', error: 'Valores incompletos.'});
    }
    //  Verificar password válido
    let existEmail = await userModel.find({email: email});
            if(existEmail){
                const user = await userModel.updateOne(
                    {email: email}, 
                    {$set:{password:createHash(password)}}
                );
                res.send({status:'Success', message:'Contraseña actualizada.'});
            };
    ///////  
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            res.render('login', {mensaje: 'Sesión cerrada.'})
        }else{
            res.send({status: "No pudo cerrar sesion", body:err});
        } 
    });
})

export default router;
