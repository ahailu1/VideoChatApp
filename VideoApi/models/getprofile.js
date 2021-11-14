const { dbMethods } = require("./createuser.js");
const { pool } = require("./db/dbconfig");

dbMethods.getBio = async (user_id) => {
  const query = "select bio from user_profile where user_id = $1";
  const data = [user_id];

  try {
    const res = await dbMethods.initQuery(query, data);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  dbMethods,
};
