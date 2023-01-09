const express = require("express");
const fs = require("fs");

const app = express();

//Utilizar JSON en las request (Cuerpo)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


class ProductManager {
    
    constructor(path){
            this.path=path;
            this.id = 0;
            this.products = [];
            this.getProducts();
    }


    async getAll(){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            return data;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    async getById(idP){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            let getData = data.find(p => p.id === idP);
            let error = (typeof(getData) === "undefined") ? 'error:producto no encontrado' : 'Producto encontrado';
            console.error (error);
            return getData;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    getProducts(){
        return this.products;
    } 

}

//Rutas para productos

//GET
/* app.get('/', (req, res) => {
    res.send({mensaje: "Bienvenidos a la ruta raíz"});
}); */

app.get('/products', async (req, res) => {   
        // Agregando límite, si no se agrega el límite trae todo los productos, de traer el límite trae la cantidad indicada.
        let limitValue = req.query.limit;
        if (!limitValue ) {
        }else{
            limitValue = parseInt(limitValue); 
        }
        console.log(limitValue );
        const prod = await product.getAll();
        const prodLimit = prod.slice(0, limitValue);
        res.send({products: prodLimit});
});

app.get('/products/:pid', async (req, res) => {
    
    let idP = parseInt(req.params.pid);
    console.log(idP);
    const prod = await product.getById(idP);
    res.send({products: prod});
});

const product = new ProductManager('productos');

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})



// http://localhost:8080/products?limit=1
// Trae un producto

// http://localhost:8080/products?limit=3
// Trae tres productos

// http://localhost:8080/products
// Trae todos los productos

// http://localhost:8080/products/6
// Trae producto por id, para id = 6 trae el producto con id = 6.