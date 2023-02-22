import express from 'express';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import {Server} from 'socket.io';

const app = express();

const port = 8080;
const httpServer = app.listen(port, ()=>console.log('Listening on port ' + port));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewRouter);
/* app.use(express.json());
app.use(express.urlencoded({ extended:true })); */



/* app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); */

socketServer.on('connection', socket => {
    console.log('Tenemos un cliente conectado');
    socket.on('message', data=>{
        console.log(data);
    })
})

//on para escuchar / recibir
//emmit para hablar / enviar