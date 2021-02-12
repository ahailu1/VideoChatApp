const redis = require("redis");
let {dbHost} = require('../config/config');

const client = redis.createClient(`redis://host.docker.internal:6379`);

let connect = (io) => {

 io.on("connection", (socket) => {
console.log(dbHost + 'is here');
  console.log('right here socketio');
    socket.on('initsession', (data) => {
        console.log(data)
        console.log(data.recipient + ' is here');
        let username = data.recipient;
        let thisData = data;
        socket.emit('testing', 'phaggot')
      socket.emit(`${username}`, thisData);
      });
    });
}
module.exports = connect