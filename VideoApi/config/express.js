const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const router = express.Router();
const server = require("http").createServer(app);
const { port } = require("./config.js");

const initServer = () => {
  server.listen(port, (err) => {
    console.log("server listening on port" + port);
  });
};
module.exports = {
  app,
  router,
  server,
  express,
  cors,
  initServer,
  bodyParser
};
