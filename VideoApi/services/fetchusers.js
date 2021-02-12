let {dbMethods} = require('../models/getfriends');

let fetchAllUsers = async (user_id) => {
    try{
        let allUsers = await dbMethods.getAllUsers(user_id);
        console.log(allUsers);
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

module.exports = {
    fetchAllUsers,
    getFriendRequests

};