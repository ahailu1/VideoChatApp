const socketio = require("socket.io");


let initSocket = (server) => {

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
})
;
io.on("connection", (socket) => {
  console.log("aaaaaaa");
  socket.on("message", (data) => {
    console.log(data);
    socket.emit('message', 'helloworld');
  });
})
};

module.exports = initSocket;