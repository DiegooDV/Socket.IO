var socket = io("http://localhost:3000");


var array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var jugador = 1;
var jugadorGanador = 0;

$(document).ready(function () {
    $("#img0").click(function (e) {
        e.preventDefault();
        cambiar(0);
    });
    $("#img1").click(function (e) {
        e.preventDefault();
        cambiar(1);
    });
    $("#img2").click(function (e) {
        e.preventDefault();
        cambiar(2);
    });
    $("#img3").click(function (e) {
        e.preventDefault();
        cambiar(3);
    });
    $("#img4").click(function (e) {
        e.preventDefault();
        cambiar(4);
    });
    $("#img5").click(function (e) {
        e.preventDefault();
        cambiar(5);
    });
    $("#img6").click(function (e) {
        e.preventDefault();
        cambiar(6);
    });
    $("#img7").click(function (e) {
        e.preventDefault();
        cambiar(7);
    });
    $("#img8").click(function (e) {
        e.preventDefault();
        cambiar(8);
    });
});


function cambiar(numero) {

    if (array[numero] == 0) {
        var id = "#img" + numero;
        var obj = {
            "numero": numero,
            "jugador": jugador
        }
        socket.emit('eleccionCasilla', obj);

        if (jugador == 1) {
            array[numero] = 1
            jugador = 2;
            $.when($(id).attr("src", "../img/cross.png")).then(function () {

                if (verificarGanador() == true) {
                    setTimeout(function () {
                        alert("El jugador " + jugadorGanador + " ha ganado el juego");
                        reiniciarJuego();
                    }, 50);
                } else if (verificarEmpate() == true) {
                    setTimeout(function () {
                        alert("Se ha llegado a un empate, se reiniciara el juego");
                        reiniciarJuego();
                    }, 50);
                }

            });

        } else {
            array[numero] = 2
            jugador = 1;
            $.when($(id).attr("src", "../img/circle.png")).then(function () {
                if (verificarGanador() == true) {
                    setTimeout(function () {
                        alert("El jugador " + jugadorGanador + " ha ganado el juego");
                        reiniciarJuego();
                    }, 50);
                } else if (verificarEmpate() == true) {
                    setTimeout(function () {
                        alert("Se ha llegado a un empate, se reiniciara el juego");
                        reiniciarJuego();
                    }, 50);
                }

            });
        }
        var obje = {
            "array": array,
            "jugador": jugador
        }
        socket.emit('enviarArreglo', obje);
    } else {
        alert("Casilla ya seleccionada");
    }
}

function verificarGanador() {

    var esGanador = false;
    for (var i = 1; i < 3; i++) {
        //horizotales
        if (array[0] == i && array[1] == i && array[2] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        if (array[3] == i && array[4] == i && array[5] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        if (array[6] == i && array[7] == i && array[8] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        //verticales
        if (array[0] == i && array[3] == i && array[6] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        if (array[1] == i && array[4] == i && array[7] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        if (array[2] == i && array[5] == i && array[8] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        //cruzados
        if (array[0] == i && array[4] == i && array[8] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
        if (array[2] == i && array[4] == i && array[6] == i) {
            jugadorGanador = i;
            esGanador = true;
            return esGanador;
        }
    }
    return esGanador;

}

function verificarEmpate() {
    var esEmpate = true;
    for (var i = 0; i < 9; i++) {
        if (array[i] == 0) {
            esEmpate = false;
        }
    }
    return esEmpate;
}

function reiniciarJuego() {
    array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    jugador = 1;
    jugadorGanador = 0;

    for (var i = 0; i < 9; i++) {
        var id = "#img" + i;
        $(id).attr("src", "../img/question.jpg")
    }
}


//socket


socket.on("actualizarCasilla", function(data){
    jugador = data.jugador;
    var id = "#img" + data.numero;
    var numero = data.numero;

    if (jugador == 1) {
        array[numero] = 1
        jugador = 2;
        $.when($(id).attr("src", "../img/cross.png")).then(function () {

            if (verificarGanador() == true) {
                setTimeout(function () {
                    alert("El jugador " + jugadorGanador + " ha ganado el juego");
                    reiniciarJuego();
                }, 50);
            } else if (verificarEmpate() == true) {
                setTimeout(function () {
                    alert("Se ha llegado a un empate, se reiniciara el juego");
                    reiniciarJuego();
                }, 50);
            }

        });

    } else {
        array[numero] = 2
        jugador = 1;
        $.when($(id).attr("src", "../img/circle.png")).then(function () {
            if (verificarGanador() == true) {
                setTimeout(function () {
                    alert("El jugador " + jugadorGanador + " ha ganado el juego");
                    reiniciarJuego();
                }, 50);
            } else if (verificarEmpate() == true) {
                setTimeout(function () {
                    alert("Se ha llegado a un empate, se reiniciara el juego");
                    reiniciarJuego();
                }, 50);
            }

        });
    }
});


socket.on("obtenerPartida", function (data) {

    jugador = data.jugador;
    array = data.array;
    for(var i = 0; i < 9; i++)
    {
        var id = "#img" + i;
        if(data.array[i] == 1)
        {
            $(id).attr("src", "../img/cross.png")
        } else if (data.array[i] == 2)
        {
            $(id).attr("src", "../img/circle.png")
        }
    }
    
});

