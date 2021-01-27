const socketio = require("socket.io");


let initSocket = (server) => {

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
  },
});

io.on("connection", (socket) => {
  socket.on('initsession', (data) => {
      console.log(data)
      console.log(data.recipient + ' is here');
      let username = data.recipient;
      let thisData = data;
      socket.emit('testing', 'phaggot')
    socket.emit(`${username}`, thisData);
    });
  });

};

module.exports = initSocket;