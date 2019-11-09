var io = require('socket.io')();


var estado = false;

	io.sockets.on('connection', function(socket){
	
    console.log("UN NUEVO CLIENTE CONECTADO CON EL SOCKET ID: " + socket.id);
    socket.emit("update",estado);

    socket.on('onChange', function(data){
        console.log("Evento " + data)

    // todos, incluido el que origina el mensaje
        //io.sockets.emit("update", data);


    //todos, excepto al que origina el mensaje
        estado = data;
        socket.broadcast.emit("update", data);

    //solo al que origina el mensaje
      // socket.emit("update",data);
    });


    }); 
    
    

	module.exports = io;
