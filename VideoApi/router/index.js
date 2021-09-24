const { bodyParser, express } = require("../config/express");

const fileLimit = bodyParser.urlencoded({ extended: true, limit: "50mb" });
const jsonLimit = bodyParser.json({ limit: "50mb" });
const createAccount = require("./createaccount");
const loginUser = require("./login");
const iceServer = require("./getserver");
const uploadImage = require("./uploadProfile");
const fetchAllUsers = require("./userdata");
const addfriend = require("./friendshipstatus");
const setBio = require("./updateprofile");
const getBio = require("./getprofile");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use("/api", fetchAllUsers);
  app.use("/api", [fileLimit, jsonLimit, uploadImage]);
  app.use("/api", createAccount.router);
  app.use("/api", loginUser.router);
  app.use("/api", iceServer);
  app.use("/api", addfriend);
  app.use("/api", setBio);
  app.use("/api", getBio);
};
