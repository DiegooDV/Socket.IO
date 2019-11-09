var socket = io("http://localhost:5000");

var imgFoco = document.getElementById("imgFoco");
var btnFoco = document.getElementById("btnFoco");

var estado = false;

socket.on("update", function(data){
    if(data)
    {
        data = true;
        imgFoco.src = "../img/lampOn.gif";
        btnFoco.innerHTML = "APAGAR";
    }
    else{
        data = false;
        imgFoco.src = "../img/lampOff.gif";
        btnFoco.innerHTML = "ENCENDER";  
    }
});

var onStart = function()
{

    if(!estado)
    {
        estado = true;
        imgFoco.src = "../img/lampOn.gif";
        btnFoco.innerHTML = "APAGAR";
    }
    else{
        estado = false;
        imgFoco.src = "../img/lampOff.gif";
        btnFoco.innerHTML = "ENCENDER";  
    }

    socket.emit('onChange', estado);

}