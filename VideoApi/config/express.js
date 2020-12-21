const express = require("express");

const app = express();
const cors = require("cors");

const router = express.Router();
const server = require("http").createServer(app);
const { port } = require("./config.js");

const initServer = () => {
  server.listen(port, (err) => {
    console.log("i tried");
  });
};
module.exports = {
  app,
  router,
  server,
  cors,
  initServer,
};
