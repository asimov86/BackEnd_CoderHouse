import express from 'express';
import cookieParser from "cookie-parser";
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import FileStore from 'session-file-store';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {MONGODB_URI} from './public/config.js';

const app=express();
const PORT= 8080;


app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));

/* app.use('/',cookieRouter);*/
app.use (cookieParser()); 
const server =  app.listen (PORT, ()=> console.log('Server arriba'));
//const FileStorage = FileStore(session);
app.use(session({
    // ttl
    // retries
    // patch
    //store : new FileStorage({path:'./sessions', ttl:100, retries:0}), 
    store : MongoStore.create({
        mongoUrl: MONGODB_URI,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl:15
    }),
    secret: "secretCode", 
    resave: false, 
    saveUninitialized: false
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