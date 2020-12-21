const { pool } = require("./db/dbconfig");

let dbMethods = {
  getUsers: async (username) => {
    console.log(username);
    const text = "select $1 from register_user";
    const values = [username];
    try {
      console.log(username);
      const res = await pool.query(text, values);
      console.log(res.rows);
      return res.rows;
    } catch (err) {
      console.log(err);
      throw new Error("couldnt fetch data");
    }
  },
};
dbMethods.insertUsers = async (username, password) => {
    const text = "insert into users(username, password) values ($1, $2)"
    const query = [username, password];
    try{
        pool.query(text,query);
    } catch (err) {
        throw new Error(err);
    }

}
module.exports = {
  dbMethods,
};
