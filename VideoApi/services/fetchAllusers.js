let {dbMethods} = require('../models/getfriends');

let fetchAllUsers = async () => {
    try{
        let allUsers = await dbMethods.getAllUsers();
        console.log(allUsers);
        return allUsers;
    } catch (err) {
        throw new Error(err);
    }

}

module.exports = fetchAllUsers;