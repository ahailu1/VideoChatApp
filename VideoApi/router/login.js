const { router } = require("../config/express");
const { loginUser } = require("../services/loginUsers");
const { createToken } = require("../services/generateToken");

router.post("/login", async (req, res) => {
  console.log('reachedu');
  const { username, password } = req.body;
  console.log('hello world');
  try {
    const { user_id, authenticated } = await loginUser(username, password);
    console.log("trying to login");
    const token = await createToken(username);
    // confirm token
    if (authenticated) {
      res.status(200).send({ token, user_id });
    } else {
      res.status(422).send({ error: "wrong credentials" });
    }
  } catch (err) {
    res.status(422).send({ error: "couldnt login" });
    throw new Error(err);
  }
});

module.exports = {
  router,
};
