const mypath = require("path");
const dotEnv = require("dotenv").config({
  path: `${mypath.resolve(__dirname, ".env")}`,
});

module.exports = {
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  dbUser: process.env.PGUSER,
  dbHost: process.env.PGHOST,
  dbPassword: process.env.PGPASSWORD,
  dbName: process.env.PGDATABASE,
  dbPort: process.env.PGPORT,
};
