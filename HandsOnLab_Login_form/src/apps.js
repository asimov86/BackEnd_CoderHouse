import express from 'express';
//import cookieParser from "cookie-parser";
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import FileStore from 'session-file-store';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {MONGODB_URI} from './public/config.js';
import viewRouter from './routes/view.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';

const app=express();
const PORT= process.env.PORT || 8080;
// Conexión mongoose 
const connection = mongoose.connect(MONGODB_URI);
// Inicializamos el motor de HDBS
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));
//app.use (cookieParser()); 



//const FileStorage = FileStore(session);
app.use(session({
    // ttl
    // retries
    // patch
    //store : new FileStorage({path:'./sessions', ttl:100, retries:0}), 
    store : MongoStore.create({
        mongoUrl: MONGODB_URI,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl:20
    }),
    secret: "secretCode", 
    resave: false, 
    saveUninitialized: false
}));

/* 
app.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se inicio sesion: ${req.session.counter} veces.`);
    }else{
        req.session.counter = 1;
        res.send('Welcome!');
    };

}); */

app.use('/',viewRouter);
app.use('/api/session', sessionsRouter);


const server =  app.listen (PORT, ()=> console.log('Server arriba'));