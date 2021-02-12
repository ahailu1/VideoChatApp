let {dbMethods} = require('./createuser.js');
const { pool } = require("./db/dbconfig");

dbMethods.updateBio = async(user_id, bio) => {
        let query = 'update user_profile set bio = $1 where user_id = $2'
        let data = [bio, user_id]
    try {
        console.log(['hitting db', bio, user_id]);
            await dbMethods.initQuery(query, data);
    } catch (err) {
        throw new Error(err);
    }

}

module.exports = {
    dbMethods
}