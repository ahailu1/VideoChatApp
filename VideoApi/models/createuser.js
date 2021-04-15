const { Query } = require("pg");
const { pool, client } = require("./db/dbconfig");

const dbMethods = {
  initQuery: async (text, values) => {
    try {
      const res = await pool.query(text, values);
      return res.rows;
    } catch (err) {
      throw new Error(err);
    }
  },
  initClientQuery: async (text, values) => {
    try {
      const res = await client.query(text, values);
      return res.rows;
    } catch (err) {
      throw new Error(err);
    }
  },
};
dbMethods.getUsers = async (username) => {
  const text =
    "select $1 from videochat.public.register_user where username = $1";
  const values = [username];
  const res = await dbMethods.initQuery(text, values);
  console.log(res);
  return res;
};
dbMethods.insertUsers = async (username, password) => {
  const text =    "insert into register_user(username, password,creation_date) values ($1, $2, CURRENT_DATE) returning user_id";
  const query = [username, password];

  const client = await pool.connect();

  try {
    await client.query("begin");

    const results = await client.query(text, query);
    const { user_id } = results.rows[0];
    const textTwo = "insert into user_profile(user_id) values ($1)";
    const queryTwo = [user_id];
    await client.query(textTwo, queryTwo);
    await client.query("COMMIT");

    return { user_id };
  } catch (err) {
    await client.query("ROLLBACK");

    throw new Error(err);
  } finally {
    client.release();
  }
};

module.exports = {
  dbMethods,
};
