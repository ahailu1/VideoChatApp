const { app, cors, initServer, bodyParser, server } = require("./config/express");
const { dbMethods } = require("./models/createuser");
const socketio = require("socket.io");
const iceCandidate = require("./router/getserver.js");
let initSocket = require('./subscriptions/socketio');
initServer();
initSocket(server);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
let initRoute = require('./router/index')(app);

