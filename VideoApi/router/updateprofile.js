let {router} = require('../config/express');
const { updateBio } = require('../services/updateprofile');

router.put('/dashboard/setbio/:user_id', async (req, res) => {
    let {user_id} = req.params;
    let {bio} = req.body;
    console.log([bio, user_id, 'is setting']);
    try{
        await updateBio(user_id, bio);
        res.status(200);
    } catch (err) {
        res.status(422);
        throw new Error(err);
    }

});

module.exports = router