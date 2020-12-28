let {dbMethods} = require('./createuser.js');
const { pool } = require("./db/dbconfig");
dbMethods.loginUser = async (username) => {
    console.log('testing');
const query = 'select password from register_user where username = $1';
const values = [username];
try{
    const res = await pool.query(query, values);
    return res.rows;
} catch (err) {
    throw new Error(err);
}
}
module.exports = {
    dbMethods
}