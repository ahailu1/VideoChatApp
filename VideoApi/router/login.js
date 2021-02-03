let {router} = require('../config/express');
let {loginUser} = require('../services/loginUsers');
const {createToken} = require('../services/generateToken');

router.post('/login', async (req, res) => {
    console.log('heeazr');
    let {username, password} = req.body;
    try {
    let {user_id, authenticated} = await loginUser(username, password);
    let token = await createToken(username);
    //confirm token
    if(authenticated){
        res.status(200).send({
    token, user_id: user_id});
    } else {
        res.status(422).send({error: 'wrong credentials'});
    }
    } catch (err) {
        res.status(422).send({error: 'couldnt login'});
        throw new Error(err);
    }
});

module.exports = {
    router
}