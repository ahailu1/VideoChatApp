const {
 app, router, bodyParser, express 
} = require("../config/express");
const uploadImage = require("../services/uploadProfile");
const { dbMethods } = require("../models/updateprofile");
// router.use([fileLimit,update]);

router.put("/dashboard/uploadprofile/:username", async (req, res) => {
  const { file, username } = req.body;
  try {
    const item = await uploadImage(file, username);
    res.status(200).send({ path: item });
  } catch (err) {
    console.log(err);
    res.status(422).send({ error: "couldnt upload picture" });
  }
});

module.exports = router;
