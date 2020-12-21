const bodyParser = require("body-parser");
const { app, cors, initServer } = require("./config/express");
const { dbMethods } = require("./models/createuser");
const { port, dbPassword } = require("./config/config.js");
const iceCandidate = require("./router/getserver.js");
initServer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
require('./router/index')(app); 

