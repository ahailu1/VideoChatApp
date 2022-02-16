const { Pool, Client } = require("pg");
const {
  dbUser,
  dbHost,
  dbPassword,
  dbName,
  dbPort,
} = require("../../config/config");
let config = { ssl:false};

const pool = new Pool({ssl: false});
const client = new Client({ssl: false});
module.exports = {
  pool,
  client,
  Pool,
};
//create table user_profile(constraint user_id_fk foreign key(user_id foreign (user_id) , bio varchar()