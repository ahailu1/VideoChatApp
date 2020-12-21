const socketio = require("socket.io");
const { server } = require("./express.js");

io.on("connection", (socket) => {
  console.log("aaaaaaa");
  socket.on("message", (data) => {
    console.log(`${data.username}hahaa`);
    console.log(data);
  });
});
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
