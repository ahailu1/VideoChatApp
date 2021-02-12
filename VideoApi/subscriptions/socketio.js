const socketio = require("socket.io");


let initSocket = (server) => {

let io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
  },
});
return io;
};

module.exports = initSocket;