const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({ err: true, message: 'El escritorio es necesario' });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // en este punto, ya tenemos asignado el ticket al escritorio correspondiente y tenemos que emitir un mensaje a la pantalla de tickets
        // para que todo el mundo sea notificado de los cambios en ultimos4.
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });


});