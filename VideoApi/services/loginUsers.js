let {dbMethods} = require('../models/loginuser');
let bcrypt = require('bcrypt');
let loginUser = async (username, password) => {
  
    try {
    let getPassword = await dbMethods.loginUser(username);
    console.log('right here');
    console.log([typeof getPassword[0], getPassword[0]]);
    let userPassword = typeof getPassword[0] === 'undefined' ? 'no user' : getPassword[0].password;

    let comparePassword = await bcrypt.compare(password, userPassword);
        if(comparePassword){
            return true
        } else if (comparePassword) {
            return false
        }

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = {
    loginUser
}