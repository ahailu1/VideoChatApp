
const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
router.get('/tweets', async (req, res) => {
    client.tokens.create().then(token => {console.log(token.username)})

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