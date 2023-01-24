const socket = io.connect();

const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', producto);
    addProduct.reset()
})

socket.on('products', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('./views/realTimeProducts.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------
