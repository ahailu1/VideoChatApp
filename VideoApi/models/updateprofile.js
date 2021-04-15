const { dbMethods } = require("./createuser.js");
const { pool } = require("./db/dbconfig");

dbMethods.updateBio = async (user_id, bio) => {
  const query = "update user_profile set bio = $1 where user_id = $2";
  const data = [bio, user_id];
  try {
    await dbMethods.initQuery(query, data);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  dbMethods,
};
