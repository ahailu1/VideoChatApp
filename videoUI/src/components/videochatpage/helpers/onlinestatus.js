export let onlineStatus =  (socket,userdata,myFollowers, callback) => {
    socket.on('connect', () => {
        let {user_id} = userdata;
        let data = {
            user_id: user_id,
            isOnline: true
        }
        socket.emit('isOnline',data);
    });
    socket.on('onlineStatus', (data) => {
        let friend_id = data.user_id;
    if(myFollowers.includes(friend_id)){
             callback(prev => {
                 let newarr = [...prev];
                 if(newarr.includes(friend_id)){
                     return prev;
                 } else {
                    newarr = newarr.concat(friend_id);
                    console.log([newarr, friend_id]);
                    return [...newarr];   
                 }
            });
    }
});
socket.on('isOffline', (data) => {
    let user_id = data.user_id;       
 
    callback(prev => {
        let offlineArr = [...prev].filter(el => {
            return el != user_id;
        });
        return [...offlineArr];
    });
});
}