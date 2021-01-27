let {app, router, bodyParser, express} = require('../config/express');
let uploadImage = require('../services/uploadProfile');
//router.use([fileLimit,update]);


router.put('/dashboard/uploadprofile/:username',async (req, res) => {    
    let {file, username} = req.body;

    try {
        console.log('beforeasad')

        let item = await uploadImage(file, username);
        console.log('here no error')
        res.status(200).send({path: item});
    } catch (err) {
        console.log(err)
        res.status(422).send({error: "couldnt upload picture"});
    }
});

module.exports = router