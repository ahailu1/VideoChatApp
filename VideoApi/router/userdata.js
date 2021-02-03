const { router, app } = require("../config/express.js");
const {fetchAllUsers, getFriendRequests} = require("../services/fetchusers");

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
router.get('/getrequests/:user_id', async (req, res) => {
    let {user_id} = req.params;
    console.log(['right eere boy', user_id]);
    try{
        let requests = await getFriendRequests(user_id);
        console.log([requests, 'fucking phaggot']);
        res.status(200).send({data: requests});
    } catch (err){
        res.status(422).send({err: 'couldnt fetch notifications'});
    }
});

module.exports = router;