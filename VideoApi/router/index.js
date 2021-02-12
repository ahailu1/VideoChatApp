let {bodyParser} = require('../config/express');
let fileLimit = bodyParser.urlencoded({extended: true, limit: '50mb'});
let jsonLimit = bodyParser.json({limit: '50mb'});
let createAccount = require('./createaccount');
let loginUser = require('./login');
let iceServer = require('./getserver');
let uploadImage = require('./uploadProfile');
let fetchAllUsers = require('./userdata');
let addfriend = require('./friendshipstatus');
let setBio = require('./updateprofile');
module.exports = (app) => {
    app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', fetchAllUsers);
app.use('/api', [fileLimit,jsonLimit, uploadImage]);
app.use('/api', createAccount.router);
app.use('/api', loginUser.router);
app.use('/api', iceServer);
app.use('/api', addfriend);
app.use('/api', setBio);

}
