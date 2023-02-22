/* import express from 'express';
import cookieParser from "cookie-parser";
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import cookieRouter from './routes/cookies.router.js';


const app=express();
const PORT= 8080;


app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));

app.use('/',cookieRouter);
app.use (cookieParser("CoderS3cr3t"));


app.get('/setCookie',(req,res)=>{
    res.cookie('CookiePrueba','Esta es mi primer cookie',{maxAge:10000}).send("Cookie")
})// maxAge importante

app.get('/getCookie',(req,res)=>{
    res.send(req.cookies.CookiePrueba)
})// Esta trae la cookie que se creó momentaneamente en el navegador con setCookie. Ojo con maxAge 

app.get('/deleteCookie',(req,res)=>{
    res.clearCookie('CookiePrueba').send('Borre la cookie')
})

app.get('/setSignedCookie',(req,res)=>{
    res.cookie('SignedCookie', 'Esta es una cookie firmada', {maxAge: 10000, signed: true}).send('Esta es una cookie firmada')
})//Cookie firmada.----> importante signed:true

app.get('/cookieForm', (req, res) => {
    res.render('home');
})

app.post('/cookieCreation', (req, res) => {
    try {
        let {userName, email} = req.body;
        console.log(userName);
        console.log(email);
        res.cookie('signedCookie', `${userName}:${email}`, {maxAge: 10000, signed:true}).send('Cookie creada.');
    } catch (error) {
        console.log(error);
    }
});


app.get('/login',(req,res)=>{
    const {username,password}=req.body
    if(username!=='admin' || password !=='admin'){
    return res.send('Login failed')
}
req.session.user=username
res.session.admin=true
res.send("loguin success")

})



const server =  app.listen (PORT, ()=> console.log('Server arriba')); */