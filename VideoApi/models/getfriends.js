let { dbMethods } = require('./createuser.js');
const { pool } = require("./db/dbconfig");

dbMethods.getAllUsers = async () => {
    let text = 'select username from register_user';
    let values = [];
    try {
        console.log('activated');
        let results = await pool.query(text,values);
        console.log(results.rows[0])
        return results.rows
    } catch (err) {
        throw new Error(err);
    }

}





module.exports = {
    dbMethods
}