const axios = require("axios");
const { router } = require("../config/express.js");
const getIceToken = require("../services/iceservers.js");

router.get("/iceservers/:username", async (req, res, next) => {
  try {
    const iceServers = await getIceToken();
    res.status(200).send({ iceServers });
  } catch (err) {
    res.status(422).send({ error: "couldnt fetch ice servers" });
    throw new Error(err);
  }
});

module.exports = router;
