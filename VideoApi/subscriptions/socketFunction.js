
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
    socket.on('confirmRequest', data => {
        let {recipient_id, sender_id} = data;
        console.log('got the recipient it' + recipient_id);
        socket.broadcast.emit(`confirm_request_with_${recipient_id}`, data);
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
        console.log(data);
        let {sender_id, recipient_id} = data;
        console.log([data, 'is here already'])
        socket.broadcast.emit(`init_video_${recipient_id}`, data);
    });
    socket.on('initStream', data => {
               let {recipient_id} = data; 
               console.log(recipient_id);
               console.log(data);
               if(recipient_id !== undefined){
                   if(data.offer){
                       console.log(data.offer + 'is an')
                    socket.broadcast.emit(`initStream_offer_${recipient_id}`, data);       
                   }
                   if(data.answer){
                       socket.broadcast.emit(`initStream_answer_${recipient_id}`, data);
                   }
               }
    });
});

}


module.exports = {
    signalSocket
}