const { dbMethods } = require("./createuser.js");
const { pool } = require("./db/dbconfig");

// add friend

dbMethods.addFriend = async (user_id, friend_id) => {
  const info = {
    statusCode: 100,
    statusName: "requested",
  };
  const initRequest =
    "insert into friendship(requester_id, recipient_id, creation_date) values ($1, $2, now())";
  const initRequestValues = [user_id, friend_id];
  const initStatus =
    "insert into friendship_status(status_code, requester_id, recipient_id, creation_date, specifier_id) values ($1, $2, $3, now(), $4)";
  const initStatusValues = [info.statusCode, user_id, friend_id, user_id];
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(initRequest, initRequestValues);
    await client.query(initStatus, initStatusValues);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    client.release();
  }
};
dbMethods.deleteFriend = async (user_id, friend_id, statusCode) => {
  const query =
    "delete from friendship where requester_id = $1 and recipient_id = $2";
  const data = [user_id, friend_id];

  try {
    await dbMethods.initQuery(query, data);
  } catch (err) {
    throw new Error(err);
  }
};

dbMethods.updateFriendStatus = async (user_id, friend_id, statusCode) => {
  try {
    const query =
      "update friendship_status set status_code = $1 where requester_id = $2 and recipient_id = $3";
    const values = [user_id, friend_id, statusCode];
    await dbMethods.initQuery(query, values);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  dbMethods,
};
