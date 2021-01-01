let {router} = require('../config/express');
let {loginUser} = require('../services/loginUsers');
const {createToken} = require('../services/generateToken');

router.post('/login', async (req, res) => {
    console.log('heeazr');
    let {username, password} = req.body;
    try {
    let confirmPassword = await loginUser(username, password);
    console.log(confirmPassword + 'faaa');
    let token = await createToken(username);
    //confirm token
    if(confirmPassword){
        res.status(200).send({
    token});
    } else {
        console.log('wrong credentialss')
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