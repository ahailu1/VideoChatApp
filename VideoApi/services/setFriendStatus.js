let {dbMethods} = require('../models/initfriendship');


let addFriend = async (username, friendname) => {

    try {
        await dbMethods.addFriend(username, friendname);
    } catch (err) {
        throw new Error(err);
    }

}


module.exports = {
    addFriend,
}