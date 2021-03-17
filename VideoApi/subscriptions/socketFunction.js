
function signalSocket(io){

io.on('connection', (socket) => {
    socket.on('isOnline', (data) => {
        socket.username = data.user_id;
        if(data.isOnline == true){
            let thisdata = {
                user_id: data.user_id,
                isOnline: true,
            }
            console.log(`${data.user_id} + 'is connected`);

            socket.broadcast.emit('onlineStatus', thisdata);
        }
    });
    socket.on('disconnect', (reason) => {
        console.log(socket.username + 'just disconnected')
        if(socket.username != undefined){
            let newData = {
                user_id: socket.username,
                isOnline: false
            }
            socket.broadcast.emit('isOffline', newData);
            return true;
        } else {
            
        }
    });
    socket.on('initVideo', (data) => {
        console.log([data, 'is here already'])
        socket.broadcast.emit('initVideo', data);
    })
});

}


module.exports = {
    signalSocket
}