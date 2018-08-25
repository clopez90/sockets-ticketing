//Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket')
    //escuchamos cuando se conecta un usuario
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//escuchamos cuando se desconecta un usuario
socket.on('disconnect', function() {
    console.log('Perdimos conexion con servidor');
});

socket.on('siguienteTicket', function(data) {
    console.log(data);
});

socket.on('estadoActual', function(data) {
    label.text(data.actual);

});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});