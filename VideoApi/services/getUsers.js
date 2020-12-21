let {dbMethods} = require('../models/createuser');
let bcrypt = require('bcrypt');
let checkUsers = async (username) => {
    
    try{
    let getUsers = await dbMethods.getUsers(username);
        if(getUsers.length > 0){
            getUsers = getUsers[0];
        }
            else {
                getUsers = false
            }
            return getUsers[0].username;
} catch (err) {
    throw new Error('couldnt fetch users for some reason. Try again');
    }
}
let insertUsers = async (username, password) => {
    //let checkExistance = await dbMethods.checkUsers(username);
    let regex = /^[a-zA-Z0-9-_]{7,}$/;
    let regexTest = regex.test(username);
    let test = password.length >= 6 ? true : pass;
    //regex no match


    if((!regext & test) || !regex || !test){
        return false
    } else if(checkExistance){

    } else {
        let password = bcrypt.hash(password)
        try{

        dbMethods.insertUsers(username, password);
        } catch(err) {
            throw new Error(err);
        }
    }
}
module.exports = {
    insertUsers
}