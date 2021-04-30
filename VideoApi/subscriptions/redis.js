const redis = require("redis");
const { dbHost } = require("../config/config");

const client = redis.createClient("redis://host.docker.internal:6379");

const connect = (io) => {
  io.on("connection", (socket) => {
    socket.on("initsession", (data) => {
      console.log(data);
      console.log(`${data.recipient} is here`);
      const username = data.recipient;
      const thisData = data;
      socket.emit(`${username}`, thisData);
    });
  });
};
module.exports = client;
