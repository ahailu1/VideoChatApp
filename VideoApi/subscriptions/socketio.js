const socketio = require("socket.io");

const initSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: false,
    },
  });
  return io;
};

module.exports = initSocket;
