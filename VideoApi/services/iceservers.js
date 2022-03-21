const { accountSid, authToken } = require("../config/config");
console.log([accountSid, authToken, 'hello world']);
const client = require("twilio")(accountSid, authToken);

getIceServer = async () => {
  try {
    console.log(accountSid + 'is defined');
    const ab = await client.tokens.create();
    const iceServer = await ab.iceServers;
    return iceServer;
  } catch (err) {
    console.log('something is wrong');
    throw new Error(err);
  }
};

module.exports = getIceServer;
