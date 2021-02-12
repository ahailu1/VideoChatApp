let { dbMethods } = require('./createuser.js');
const { pool } = require("./db/dbconfig");

dbMethods.getAllUsers = async (user_id) => {
    let text = 'select username, register_user.user_id, creation_date, bio from register_user join user_profile on user_profile.user_id = register_user.user_id';
    let values = [];
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
    let query = 'select distinct register_user.username, user_profile.bio, register_user.user_id ,friendship.creation_date from register_user right join user_profile on register_user.user_id = user_profile.user_id inner join friendship on friendship.recipient_id = register_user.user_id inner join friendship_status on friendship_status.requester_id = friendship.requester_id where friendship_status.recipient_id = $1 and friendship_status.status_code = $2';
    let values = [1, 100];
    try {
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