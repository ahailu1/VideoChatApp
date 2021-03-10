let {dbUser,
  dbHost,
  dbPassword,
  dbName,
  dbPort} = require('../../config/config');

const { Pool, Client } = require("pg");

const pool = new Pool();
const client = new Client();
module.exports = {
  pool,
  client,
  Pool
};
