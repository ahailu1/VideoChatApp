const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");

const bodyParser = require("body-parser");
const { port } = require("./config.js");

const iceCandidate = require("./router/getserver.js");
const io = socketio(server, { cors: {
    origin: "http://localhost:3000  ",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  } 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/getservers", iceCandidate);

io.on("connection", (socket) => {
  console.log("aaaaaaa");
  socket.on("message", (data) => {
    console.log(`${data.username}hahaa`);
    console.log(data);
  });
});
server.listen(port, (err) => {
    console.log('i tried');
});
