const { app, cors, initServer, bodyParser, server, router } = require("./config/express");
const { dbMethods } = require("./models/createuser");
const iceCandidate = require("./router/getserver.js");
let initSocket = require('./subscriptions/socketio');
let {signalSocket} = require('./subscriptions/socketFunction');
app.use(cors({ credentials: true, origin: "*" }));
initServer();

let io = initSocket(server);
let initRoute = require('./router/index')(app);
signalSocket(io);