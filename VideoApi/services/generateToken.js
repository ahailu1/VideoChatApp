let jwt = require('jsonwebtoken');
    let {secretKey} = require('../config/config');
 let createToken = async (username) => {
    //ideally secret key is stored somewhere on server. we should aquire this key by reading the file
    try {
    let token = await jwt.sign(username, secretKey);
    return token;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

let authenticateToken = async (username, bearer) => {

}


module.exports = {
    createToken
}