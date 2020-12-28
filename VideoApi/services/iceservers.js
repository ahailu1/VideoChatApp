const {
    accountSid,
    authToken,
  } = require("../config/config");
  const client = require("twilio")(accountSid, authToken);

getIceServer = () => {
    let ab = await client.tokens.create();
    const iceServer = await ab.iceServers;
    return iceServer;  
}

module.exports = getIceServer;