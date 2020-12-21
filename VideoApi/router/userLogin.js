const { router } = require("../config/express.js");
let {}
router.post("/createaccount", (req,res) => {
  const { username, password, confirmPassword } = req.body;
  try {

  } catch (err) {
    res.status(422).send({err: err});
  }
});

module.exports = {
router
}