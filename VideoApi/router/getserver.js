const axios = require("axios");
const cors = require("cors");
const { router } = require("../config/express.js");
const {
  apiKey,
  apiSecret,
  bearerToken,
  accountSid,
  authToken,
} = require("../config/config");
// const client = require("twilio")(accountSid, authToken);

router.get("/icecandidate", async (req, res, next) => {
  console.log([authToken, accountSid]);
  /*
  try{
    let ab = await client.tokens.create();
    const iceServer = await ab.iceServers;
    console.log(iceServer);
    res.status(200).send({iceServers: iceServer});
  } catch (err) {
    res.status(422).send({error: 'couldnt fetch ice servers'})
    throw new Error();
  }
*/
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
// res.status(200).send(response)

module.exports = router;
