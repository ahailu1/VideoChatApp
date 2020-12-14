const express = require("express");

const app = express();

const cors = require("cors");
const http = require("http");

const { port } = require("./config.js");

const io = require("socket.io")(port);
const hostname = "127.0.0.1";

const iceCandidate = require("./router/getserver.js");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/getservers", iceCandidate);
console.log(port);
io.on("connection", (socket) => {
  console.log("aaaaaaa");
  socket.on("message", (data) => {
    socket.emit(`${data.username}`, pc);
    console.log(data);
    console.log(iceServer);
  });
});
