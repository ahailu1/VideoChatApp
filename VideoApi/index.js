const { app, cors, initServer, bodyParser, server, router } = require("./config/express");
const { dbMethods } = require("./models/createuser");
const socketio = require("socket.io");
const iceCandidate = require("./router/getserver.js");
let initSocket = require('./subscriptions/socketio');
initServer();
initSocket(server);
app.use(cors({ credentials: true, origin: "*" }));
let initRoute = require('./router/index')(app);
