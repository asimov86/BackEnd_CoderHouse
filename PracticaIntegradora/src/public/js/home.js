const socket=io();
const chatBox= document.getElementById('chatBox');
const chatURL = '/api/chats';
Swal.fire({
     title:"Identificate : ",
     input:"text",
     text:" Ingrese su nombre en el chat",
     inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario'
     },
     allowOutsideClick:false
}).then (result =>{
    user=result.value;
    socket.emit('authenticated',user)
})




/* chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{user:user,message:chatBox.value});
            chatBox.value="";
        }
    }
}) */


chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            let fyh = new Date().toLocaleString();
            socket.emit("message",{user:user,message:chatBox.value,fyh:fyh});
            fetch(chatURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify( {user: user, message: chatBox.value,fyh:fyh})
            })
                .then((response) => response.json())
                .then((data)=> console.log('dataFetch', data))
            chatBox.value="";
        }
    }
})


// socket.on('messageLogs',data=>{
//     let log=document.getElementById('messageLogs');
//     let messages ="";
//     data.forEach(message=>{
//         messages = messages +`${message.user} dice : ${message.message} </br>`
//     })
//     log.innerHTML=messages;
// })

// socket.emit('message','conexion abierta');

socket.on('messageLogs',data=>{
    if(!user) return;

    let log=document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message=>{
        messages += messages+ `${message.user} ${message.fyh} dice: ${message.message}<br/>`
    })
    log.innerHTML=messages;
})

socket.on('newUserConnected',data=>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton:false,
        timer:3000,
        title:`${data} se ha unido al chat`,
        icon:"success"
    })
})