const { app, cors, initServer, bodyParser, server, router } = require("./config/express");
const { dbMethods } = require("./models/createuser");
const iceCandidate = require("./router/getserver.js");
let initSocket = require('./subscriptions/socketio');
let connect = require('./subscriptions/redis');
initServer();
let io = initSocket(server);
connect(io);
app.use(cors({ credentials: true, origin: "*" }));
let initRoute = require('./router/index')(app);



