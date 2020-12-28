const { router } = require("../config/express.js");
let {insertUsers} = require('../services/getUsers');
const {createToken} = require('../services/generateToken');
router.post("/createaccount", async (req,res) => {
  const { username, password, confirmPassword } = req.body;
  console.log([username,password, confirmPassword]);
  try {
    let item = await insertUsers(username,password,confirmPassword);
    let results = item;

    if(results === true){
      console.log(results);
      let token = await createToken(username);
      console.log(token + ' faggot');
      res.status(200).send({ data: token });
    } else {
      console.log(item);
      res.status(422).send({data:item});
    }
  } catch (err) {
    res.status(422).send({err: err});
  }
});

module.exports = {
router
}