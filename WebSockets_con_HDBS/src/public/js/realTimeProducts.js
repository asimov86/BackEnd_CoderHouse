const socket = io();
socket.emit('message', 'Tenemos una conexión abierta.');
socket.on('evento para socket individual', data=>{
    console.log(data);})