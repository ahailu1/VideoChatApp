const http = require('http');
const hostname = '127.0.0.1';
const cors = require('cors');
const express = require('express');
const app = express();
const {port,apiKey, apiSecret, bearerToken, accountSid} = require('./config');
const tweetRoute = require('./router.js/tweet');
const io = require('socket.io')(port);
const client = require('twilio')(accountSid, bearerToken);
let iceServer;
client.tokens.create().then(token => {
    console.log(token);
    iceServer = token.iceServers;
})

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/twitterapi', tweetRoute);
console.log('connected')

io.on('connection',socket => {
    
    
socket.on('message', (data) => {
    
    let configurationaz = { iceServers : iceServer };
    let pc = new RTCPeerConnection(configurationaz);
    
    socket.emit(`${data.username}`, pc);
    console.log(data);
    console.log(iceServer);
})

});
