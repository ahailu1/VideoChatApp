const { router, app } = require("../config/express.js");
const fetchAllUsers = require("../services/fetchAllusers");

router.get('/fetch/allusers', async (req, res, next) => {
    console.log('here activated')
    try {
        let allUsers = await fetchAllUsers();
        res.status(200).send({users: allUsers});

    } catch (err) {
        console.log(err);
        res.status(422).send({error: 'error'});
    }
});

module.exports = router;