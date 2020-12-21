let {app} = require('../config/express');
let {loginUser} = require('./userLogin');


module.exports = (app) => {
app.use('/api', loginUser);
}
