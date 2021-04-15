const { Pool, Client } = require("pg");
const {
  dbUser,
  dbHost,
  dbPassword,
  dbName,
  dbPort,
} = require("../../config/config");

const pool = new Pool({ ssl: { require: true, rejectUnauthorized: false } });
const client = new Client({ database: dbName });
module.exports = {
  pool,
  client,
  Pool,
};
