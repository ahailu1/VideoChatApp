const {
  app,
  cors,
  initServer,
  bodyParser,
  server,
  router,
} = require("./config/express");
const { dbMethods } = require("./models/createuser");
const iceCandidate = require("./router/getserver.js");
const initSocket = require("./subscriptions/socketio");
const { signalSocket } = require("./subscriptions/socketFunction");

app.use(cors({ credentials: false, origin: "*" }));
initServer();
const io = initSocket(server);
const initRoute = require("./router/index")(app);

signalSocket(io);
