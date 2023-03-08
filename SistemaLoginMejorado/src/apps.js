import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import mongoose  from 'mongoose';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import {MONGODB_URI} from './public/js/config.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js';
import session, { Cookie } from 'express-session';
import passport from "passport";
import initPassport from "./config/passport.config.js"

const app = express();
const PORT= process.env.PORT || 8080;
// Conexión mongoose 
const connection = mongoose.connect(MONGODB_URI);

const httpServer = app.listen(PORT, ()=>console.log('Listening on port ' + PORT));

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));



// Conexión con MONGO
/* mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}) */




initPassport();
app.use(session({
    secret:"SecretCoders",
    resave: false , 
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionsRouter);
/* app.use(session({
    store : MongoStore.create({
        mongoUrl: MONGODB_URI,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl:120
    }),
    secret: "secretCode", 
    resave: false, 
    saveUninitialized: false,
    cookie: { sameSite: 'strict' }
})); */