
const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
let {apiKey, apiSecret, bearerToken, accountSid} = require('../config');
const client = require('twilio')(accountSid, bearerToken);

router.get('/icecandidate', async (req, res) => {
    console.log('requested server buddy');
    client.tokens.create().then(token => {
        console.log(token);         
        let iceServer = token.iceServers;
        res.status(200).send({'iceServers': [{iceServer}]});
    }).catch(err => {
        res.status(422);
    });
});  
/*
    client.messages.create({
        body: 'yo its me alex. Im sending this from a program that I had written',
        from: '+16475762354',
        to: '+6477838731'
    }).then(message => {
        console.log(message);
    })
console.log('request served');
   
});     
*/
//res.status(200).send(response)

module.exports = router;