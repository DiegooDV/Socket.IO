var io = require('socket.io')();

var array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var jugador = 1;
var obj = {
	"array" : array,
	"jugador" : jugador
}


	io.sockets.on('connection', function(socket){
	
	console.log("UN NUEVO CLIENTE CONECTADO CON EL SOCKET ID: " + socket.id);
			socket.emit("obtenerPartida",obj);

			socket.on('eleccionCasilla', function(data){
				socket.broadcast.emit("actualizarCasilla", data);
				
			});

			socket.on('enviarArreglo', function(data){
				array = data.array;		
				jugador = data.jugador;	
				obj.array = data.array
				obj.jugador = data.jugador


			});

	
	
    });


	//AQUI COLOCAREMOS TODOS NUESTROS EVENTOS DE TIPO io.sockets.emit

	module.exports = io;