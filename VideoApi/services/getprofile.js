let {dbMethods} = require('../models/getprofile');


let getBio = async (user_id) => {

try{
    let res = await dbMethods.getBio(user_id);
    return res;

} catch (err) {
    throw new Error(err);
}

}

module.exports = {
    getBio
}