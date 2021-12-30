const { accountSid, authToken } = require("../config/config");
const client = require("twilio")(accountSid, authToken);

getIceServer = async () => {
  try {
    const ab = await client.tokens.create();
    const iceServer = await ab.iceServers;
    return iceServer;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getIceServer;
