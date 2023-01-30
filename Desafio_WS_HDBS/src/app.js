const express = require('express')
const path = require('path')
// const publicPath = path.resolve(__dirname, './public');
const { engine } = require('express-handlebars');
const http = require('http');
const io = require('socket.io');

const products_api = require('./api/products_api.js');


// const hbs = handlebars.create({
//     extname: 'hbs',
//     defaultLayout: 'index.hbs',
//     layoutsDir: __dirname + "/views/layaout",
//     partialsDir: __dirname + "/views/partials"
// });

//--------------------------------------------
// instancio servidor, socket y api

const app = express();

const myServer = http.Server(app);
const myWSServer = io(myServer);

const productosApi = new products_api();

//--------------------------------------------
// configuro el socket

myWSServer.on('connection', async socket => {
    console.log('Un nuevo usuario se ha conectado');

    // carga inicial de productos
    socket.emit('products', productosApi.showAll());
    // console.log(productosApi.showAll());

    // actualizacion de productos
    socket.on('update', producto => {
        productosApi.save(producto)
        myWSServer.sockets.emit('products', productosApi.showAll());
    })

});


// Se agrega lo sig para poder trabajar correctamente con lo que nos envian en el body de un POST o PUT
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


let productos = [
    {
        title: "Hamburguesa",
        price: "1234",
        thumbnail: "https://st4.depositphotos.com/1328914/20814/i/600/depositphotos_208145482-stock-photo-double-cheeseburger-with-lettuce-tomato.jpg",
        id: 1
    },
    {
        title: "Tequeños",
        price: "1200",
        thumbnail: "https://st4.depositphotos.com/1328914/20814/i/600/depositphotos_208145482-stock-photo-double-cheeseburger-with-lettuce-tomato.jpg",
        id: 2
    }
];

//Rutas para productos

//GET

app.get("/realTimeProducts", (req, res) => {
    const product = productos;
    res.render('realTimeProducts', { 
        product: product,
        listExists: true,});
});

app.get("/home", (req, res) => {
    const product = productos;
    res.render('home', { 
        product: product,
        listExists: true,});
});

// Inicializacion de servidor, definicion y asignacion de puerto
const puerto = 8080
const server = myServer.listen(puerto, () => {
    console.log('Server arriba en puerto', puerto)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
