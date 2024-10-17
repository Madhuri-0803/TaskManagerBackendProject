let io;
module.exports = {
    init: (server) => {
        io = require('socket.io')(server);
        io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    },
    getSocketInstance: () => io,
};
