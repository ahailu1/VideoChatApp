const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const router = express.Router();

const { port } = require("./config.js");
/*
const certificatePath = path.resolve(path.join(__dirname, "../certificates"));
const options = {
  key: fs.readFileSync(`${certificatePath}/key.pem`),
  cert: fs.readFileSync(`${certificatePath}/cert.pem`),
};
*/
const server = require("http").createServer(app);

const initServer = () => {
  server.listen(port, (err) => {
    console.log(err);
    console.log(`server listening on port${port}`);
  });
};
module.exports = {
  app,
  router,
  server,
  express,
  cors,
  initServer,
  bodyParser,
};
