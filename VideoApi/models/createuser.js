const { pool, client } = require("./db/dbconfig");




let dbMethods = {
  initQuery: async (text,values) => {
    try {
      let res = await pool.query(text, values);
      return res.rows;

    } catch (err) {
      throw new Error(err);
    }
    },
    initClientQuery : async(text,values) => {
      
      try{
        let res = await client.query(text,values);
        return res.rows;
      } catch (err) {
        throw new Error(err);
      }

    }
  }
  dbMethods.getUsers = async (username) => {
    const text = "select $1 from videochat.public.register_user where username = $2";
    const values = [username, username];
    let res =  dbMethods.initQuery(text,values);
    return res;
  }
dbMethods.insertUsers = async (username, password) => {
    const text = "insert into register_user(username, password,creation_date) values ($1, $2, CURRENT_DATE) returning user_id"
    const query = [username, password];
    let res = await dbMethods.initQuery(text,query);
    return res;
}

module.exports = {
  dbMethods,
};
