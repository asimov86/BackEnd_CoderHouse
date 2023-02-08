import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import mongoose  from 'mongoose';
import __dirname from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(`${__dirname}/public`));


const port = 8080;
const server = app.listen(port, ()=>console.log('Listening on port ' + port));

mongoose.connect('mongodb+srv://mongooseUser:MpMeleWU5BNrhOgg@mongoosecluster0.a4g1hor.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
    if (error){
        console.log("No hubo conexion " +error)
        process.exit();
    }
})


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


///////////