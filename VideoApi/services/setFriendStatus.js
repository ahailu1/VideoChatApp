let {dbMethods} = require('../models/initfriendship');


let addFriend = async (username, friendname) => {

    try {
        await dbMethods.addFriend(username, friendname);
    } catch (err) {
        throw new Error(err);
    }

}
let confirmFriend  = async (user_id, friend_id, status_code) => {
        try {
            await dbMethods.updateFriend(user_id, friend_id);

        } catch (err) {
            throw new Error(err);
        }
}
let denyFriend  = async (user_id, friend_id, status_code) => {
    try {
        await dbMethods.updateFriend(user_id, friend_id, status_code);

    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    addFriend,
    denyFriend,
    confirmFriend
}