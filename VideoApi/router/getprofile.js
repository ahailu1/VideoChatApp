const { router } = require("../config/express.js");
const { getBio } = require('../services/getprofile');


router.get('/dashboard/getbio/:user_id', async (req, res) => {

    let {user_id} = req.params;
    console.log(user_id + ' is an idiot');
    try{
        let bio = await getBio(user_id);
            res.status(200).send(bio);
    } catch (err) {
        res.status(422).send(err);
        throw new Error(err);
    }

});


module.exports = router