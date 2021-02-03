let {dbMethods} = require('../models/loginuser');
let bcrypt = require('bcrypt');
let loginUser = async (username, password) => {
  
    try {
    let getPassword = await dbMethods.loginUser(username);
    console.log([typeof getPassword[0], getPassword[0]]);
    console.log(getPassword);
    let userPassword = typeof getPassword[0] === 'undefined' ? 'no user' : getPassword[0].password;

    let comparePassword = await bcrypt.compare(password, userPassword);
    console.log([comparePassword, 'phaggot']);
        if(comparePassword){
            let data = {
                authenticated: true,
                user_id : getPassword[0].user_id
            }
            return data
        } else if (!comparePassword) {
            let isAuth = {
                authenticated: false,
                user_id: false
            }
            return isAuth;
        }

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = {
    loginUser
}