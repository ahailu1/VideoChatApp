let {app, router, bodyParser, express} = require('../config/express');
let uploadImage = require('../services/uploadProfile');
//router.use([fileLimit,update]);


router.put('/uploadprofile/:username',async (req, res) => {    
    let {file, username} = req.body;

    try {
        let item = await uploadImage(file, username);
        res.status(200).send({path: item});
    } catch (err) {
        res.status(422).send({error: "couldnt upload picture"});
    }
});

module.exports = router