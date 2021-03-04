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
    //get my friend requests
    console.log(user_id + 'is a phaggot')
    let query = 'select requester_id,username,fs2.creation_date, bio from friendship_status fs2 join register_user on (requester_id = user_id and recipient_id = $1 ) join user_profile up on requester_id = up.user_id';
    let values = [user_id];
    try {
        let res = await dbMethods.initQuery(query, values);
        return res; 
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
dbMethods.getFriendCount = async (user_id) => {
    //for search bar follow count
    let query = "select sum(case when requester_id = $1 and not recipient_id = $1 then 1 else 0 end) as following, sum(case when recipient_id = $1 and not requester_id = $1 then 1 else 0 end) as followers from friendship_status;"
    let values = [user_id];
    try {
        let res = await dbMethods.initQuery(query, values);
        console.log(res);
        return res;
    } catch (err) {
        throw new Error(err);
    }
}
dbMethods.getFriendsList = async (user_id) => {
    //for notifications get the followers and following of users that had followed me
    let query = 'select distinct (case when requester_id = $1 and not recipient_id = $1 then recipient_id else null end) as following, (case when recipient_id = $1 then requester_id else null end) as followers, username from friendship_status fs2 join register_user on (recipient_id = user_id and not recipient_id = $1  ) or (requester_id = user_id and not requester_id = $1) where requester_id = $1 or recipient_id = $1;'
    let values = [user_id];
    try {
        let res = await dbMethods.initQuery(query, values);
        return res;
    } catch (err) {
        console.log('data base error idiots')
        throw new Error(err);
    }

}
dbMethods.getFriendsId = async (user_id) => {
    //for friends list
    let query = 'select (case when recipient_id = $1 and not requester_id = $1 then requester_id end) as followers,(case when requester_id = $1 and not recipient_id = $1 then recipient_id end)as following from friendship_status where requester_id = $1 or recipient_id = $1';
    let values = [user_id];
    try{
        let res = await dbMethods.initQuery(query, values);
        return res;
    } catch (err) {
        throw new Error(err);
    }
}
dbMethods.getFriendInfo = async (user_id) => {
    let query = 'select distinct username, ru.creation_date,bio, (case when fs2.recipient_id = $1 and not fs2.requester_id = $1 then requester_id else null end) as followers ,(case when fs2.requester_id = $1 and not fs2.recipient_id = $1 then recipient_id else null end) as following from friendship_status fs2 join register_user ru on (case when recipient_id = $1 then requester_id when requester_id = $1 then recipient_id else null end) = ru.user_id join user_profile up on ru.user_id = up.user_id where requester_id = $1 or recipient_id = $1';
    let values = [user_id];
    try{
        let res = await dbMethods.initQuery(query, values);
        return res;
    } catch (err) {
        throw new Error(err);
   
    }
}







module.exports = {
    dbMethods
}