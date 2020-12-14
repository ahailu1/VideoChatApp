const dotEnv = require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
  accountSid: process.env.ACCOUNT_SID,
};
