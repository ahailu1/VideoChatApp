const http = require('http');
const hostname = '127.0.0.1';
const cors = require('cors');   
const express = require('express');
const app = express();
let {port} = './config.js'
const iceCandidate = require('./router/getserver.js');
const io = require('socket.io')(port);


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/getservers', iceCandidate);
console.log('connected')

io.on('connection',socket => {
    
socket.on('message', (data) => {    
    socket.emit(`${data.username}`, pc);
    console.log(data);
    console.log(iceServer);
})

});
