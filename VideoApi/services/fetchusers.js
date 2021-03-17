let {dbMethods} = require('../models/getfriends');

let fetchAllUsers = async (user_id) => {
    try{
        let allUsers = await dbMethods.getAllUsers(user_id);
        return allUsers;
    } catch (err) {
        throw new Error(err);
    }

}
let getFriendRequests = async (user_id) => {

    try {
            let requests = await dbMethods.getFriendRequests(user_id);
            return requests;
            
    } catch (err) {
        throw new Error(err);
        
    }
}
let fetchFriendCount = async (user_id) => {
    try{
          let followers = await dbMethods.getFriendCount(user_id);
          return followers; 

    } catch (err) {
        throw new Error(err);
    }
}
let fetchFriendsList = async (user_id) => {
    try{
        let friendsList = await dbMethods.getFriendsList(user_id);
        return friendsList;
    } catch (err) {
        throw new Error(err);
    }
}
let fetchFriendsId = async (user_id) => {
    try{
        let friendsList = await dbMethods.getFriendsId(user_id);
        return friendsList;

    } catch (err) {
        throw new Error(err);
    }
}
let fetchFriendInfo = async (user_id) => {
    try{
        let friendsList = await dbMethods.getFriendInfo(user_id);
        return friendsList;

    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    fetchAllUsers,
    getFriendRequests,
    fetchFriendCount,
    fetchFriendsList,
    fetchFriendsId,
    fetchFriendInfo
};