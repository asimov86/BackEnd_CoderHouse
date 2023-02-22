const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key] = value);
    fetch('/api/session/logout',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>result.json())
    .then(json=>console.log(json));

    //res.render('home', {mensaje: 'Usuario logueado.'})

});