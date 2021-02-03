let {dbMethods} = require('../models/createuser');
let bcrypt = require('bcrypt');
let checkUsers = async (username) => {
    try {
        console.log('about to hit database');
    let getUsers = await dbMethods.getUsers(username);
        if(getUsers.length > 0){
            getUsers = true;
        }
            else {
                getUsers = false
            }
            return getUsers;
} catch (err) {
    console.log('database error');
    throw new Error(err);
    }
}
let insertUsers = async (username, password, confirmPassword) => {
    let errors = {};
    let saltRounds = 10;
    let regex = /^[a-zA-Z0-9-_]{7,}$/;
    let regexTestUsername = regex.test(username);
    let userPassword = password;
    let passwordTest = userPassword.length >= 6 ? userPassword : false;
    let checkExistance = await checkUsers(username);
    console.log(checkExistance);
    if(!regexTestUsername){
        errors.error = "invalid username";
        errors.authenticated = false;
        return errors
    } else if(checkExistance === true){
        console.log('hello world');
        errors.authenticated = false;
        errors.error = "username already exists"
        return errors;
    } else if (password !== confirmPassword){
        console.log('sdfdfsfdsfdsdfs');
        errors.authenticated = false;
        errors.error = "passwords dont match";
        return errors;
    } else if (passwordTest === false) { 
        errors.authenticated = false;
        errors.error = 'password is too short';
        return errors;
    } else { 
        try {

            let password = await bcrypt.hash(userPassword, saltRounds);
        let user_id = await dbMethods.insertUsers(username, password);
        let initAcc = {
            authenticated: true,
            user_id : user_id[0].user_id,
        }
        return initAcc
        } catch(err) {
            console.log('some error');
            errors.authenticated = false
            errors.error = 'network error';    
            return errors;
        }
    }
}

module.exports = {
    insertUsers,
}