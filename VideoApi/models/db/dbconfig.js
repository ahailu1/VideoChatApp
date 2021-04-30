const { Pool, Client } = require("pg");
const {
  dbUser,
  dbHost,
  dbPassword,
  dbName,
  dbPort,
} = require("../../config/config");
let config = { ssl: { require: false, rejectUnauthorized: false } };

const pool = new Pool();
const client = new Client();
module.exports = {
  pool,
  client,
  Pool,
};
