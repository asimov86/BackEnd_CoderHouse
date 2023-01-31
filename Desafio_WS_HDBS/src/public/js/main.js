const socket = io.connect();

const addProduct = document.getElementById('addProduct');


addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', producto);
    addProduct.reset()
});

    



// socket.on('products', productos => {
//     makeHtmlTable(productos).then(html => {
//         document.getElementById('productos').innerHTML = html
//     })
// });

// ------------ AGREGADO CON SECOKET NECESITAS RENDERIZARLO DESDE ESTA MANERA 
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
const tabla = document.getElementById('tabla');
socket.on('products', productos => {
    let conjunto = ''
    
    productos.map((e)=> {
        conjunto += 
        
        `
            <tr id="${e.id}">
              <th scope="row">${e.id}</th>
              <td>${e.title}</td>
              <td>${e.description}</td>
              <td>$${e.price}</td>
              <td colspan="2">${e.stock}</td>
              <td>
                <img style="height: 18px;" src="${e.thumbnail}" >
              </td>
              <td>
                <button type="button" id="btnDelete" class="btn btn-danger btn-sm" onclick="deleteProducts(${e.id})">Eliminar</button>
              </td>
            </tr>
        `

        tabla.innerHTML = conjunto
    })
});

// --------------------------------------------------------------------------------------------onclick="deleteProducts(${e.id})"
// --------------------------------------------------------------------------------------------

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
      

function deleteProducts(del) {
    console.log(del);
    del = del - 1;//Para que borre correctamente. Ya que para borrar la fila se comienza desde 0.
    if (tabla) {
        tabla.addEventListener("click", ()=>{ 
            console.log('delete');
                tabla.deleteRow(del);
    });
}
} 

    
