import express from 'express';
import session, { Session } from 'express-session';
import cookieParser from "cookie-parser";
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import cookieRouter from './routes/cookies.router.js';


const app = express();
const PORT = 8080;
const server =  app.listen (PORT, ()=> console.log('Server arriba'));

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(session({
    secret: 'secretClase',
    resave: true,//para mantener activa la sesion
    saveUninitialized: true,//guardar el objeto de la sesion

}));

app.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se inicio sesion: ${req.session.counter} veces.`);
    }else{
        req.session.counter = 1;
        res.send('Welcome!');
    };

});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) res.send('Sesion cerrada.')
        else res.send({status: "No pudo cerrar sesion", body:err});
    });
})

/* app.get('/login', (req, res) => {
    const {username, password} = req.body;
    if(username !== 'admin' || password !== 'admin') {
        return res.send('Login failed');
    }
    req.session.user=username;
    req.session.admin=true;
    req.send('Login successful');
    }  
) */

app.get('/loginForm', (req, res) => {
    res.render('home');
})

app.get('/login',(req,res)=>{
    try {
        let {username,password}=req.body
        console.log(username);
        console.log(password);
        if(username!=='admin' || password !=='admin'){
        return res.send('Login failed')
        }
        req.session.user=username
        res.session.admin=true
        res.send("loguin success")
    } catch (error) {
        console.log(error);
    }
    

})
