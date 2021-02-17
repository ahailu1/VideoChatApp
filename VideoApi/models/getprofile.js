let {dbMethods} = require('./createuser.js');
const { pool } = require("./db/dbconfig");


dbMethods.getBio = async (user_id) => {
    let query = 'select bio from user_profile where user_id = $1';
    let data = [user_id];
    
    try{
        let res = await dbMethods.initQuery(query, data);
        console.log('trying u fuckingp haggot')
        return res;
    } catch (err) {
        throw new Error(err);
    }


}

module.exports = {
    dbMethods
}