let { dbMethods } = require('./createuser.js');
const { pool } = require("./db/dbconfig");

dbMethods.getAllUsers = async (user_id) => {
    let text = 'select username, user_id from register_user ru where user_id not in (select recipient_id from friendship where recipient_id = $1 or requester_id = $2);';
    let values = [user_id, user_id];
    console.log('right heere biich');
    try {
        let data = await dbMethods.initQuery(text,values);
        return data;

    } catch (err) {
        throw new Error(err);
    }
}
dbMethods.getFriendRequests = async (user_id) => {
    console.log(user_id + 'is a phaggot')
    let query = 'select distinct register_user.username, friendship_status.requester_id, friendship_status.recipient_id from register_user inner join friendship on friendship.requester_id = register_user.user_id inner join friendship_status on friendship_status.requester_id = friendship.requester_id where friendship_status.recipient_id = $1 and friendship_status.status_code = $2';
    let values = [1, 100];
    try {
        console.log('trying')
        let res = await dbMethods.initQuery(query, values);
    return res; 
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};





module.exports = {
    dbMethods
}