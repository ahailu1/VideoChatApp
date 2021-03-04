let {dbMethods} = require('./createuser.js');
const { pool } = require("./db/dbconfig");

// add friend

dbMethods.addFriend = async (user_id, friend_id) => {
    let info = {
        statusCode: 100,
        statusName : 'requested'
    }
    let initRequest = 'insert into friendship(requester_id, recipient_id, creation_date) values ($1, $2, now())';
    let initRequestValues = [user_id, friend_id]; 
    let initStatus = 'insert into friendship_status(status_code, requester_id, recipient_id, creation_date, specifier_id) values ($1, $2, $3, now(), $4)';
    let initStatusValues = [info.statusCode, user_id, friend_id, user_id];  
    let client = await pool.connect();    
    try {
        await client.query('BEGIN');
        await client.query(initRequest, initRequestValues);
        await client.query(initStatus, initStatusValues);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(err);
    } finally {
        client.release();
    }
}
dbMethods.deleteFriend = async (user_id, friend_id, statusCode) => {
    let query = 'delete from friendship where requester_id = $1 and recipient_id = $2';
    let data = [user_id, friend_id];
    
    try{
        await dbMethods.initQuery(query, data);
    } catch (err) {
        throw new Error(err);
    }
    }


dbMethods.updateFriendStatus = async (user_id, friend_id, statusCode) =>  {
    try {
        let query = 'update friendship_status set status_code = $1 where requester_id = $2 and recipient_id = $3'
        let values = [user_id, friend_id, statusCode];
        await dbMethods.initQuery(query, values);   
        } catch (err) {
        throw new Error(err);
        }
    }


module.exports = {
    dbMethods
}