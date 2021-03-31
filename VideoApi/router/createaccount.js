const { router } = require("../config/express.js");
let {insertUsers} = require('../services/createuser');
const {createToken} = require('../services/generateToken');
router.post("/createaccount", async (req,res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    console.log([username,password,confirmPassword]);
    console.log('trying over here');
    let item = await insertUsers(username,password,confirmPassword);
    console.log(item);
    let {authenticated} = item;
    console.log([authenticated, 'phaggot is not authentic']);
    if(authenticated === true){
      let {user_id } = item;

      let token = await createToken(username);
      res.status(200).send({ token: token, user_id: user_id });
    } else {
      res.status(422).send({data:item});
    }
  } catch (err) {
    res.status(422).send({data: 'eriiisfdfdsfdsror'});
  }
});

module.exports = {
router
}