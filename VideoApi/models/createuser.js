const { pool } = require("./db/dbconfig");

let dbMethods = {
  getUsers: async (username) => {
    const text = "select $1 from videochat.public.register_user where username = $2";
    const values = [username, username];
    try {
      let res = await pool.query(text, values);
      console.log([res.rows, 'helloasdsadds'])
      return res.rows;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};
dbMethods.insertUsers = async (username, password) => {
    const text = "insert into register_user(username, password,creation_date) values ($1, $2, CURRENT_DATE)"
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
