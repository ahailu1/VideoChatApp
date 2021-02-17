const { router, app } = require("../config/express.js");
const {fetchAllUsers, getFriendRequests, fetchFollowers} = require("../services/fetchusers");

router.get('/fetch/allusers/:user_id', async (req, res, next) => {
    let {user_id} = req.params;
    try {
        let allUsers = await fetchAllUsers(user_id);
        res.status(200).send({users: allUsers});

    } catch (err) {
        res.status(422).send({error: 'error'});
    }
});
router.get('/getrequests/:user_id', async (req, res) => {
    let {user_id} = req.params;
    try{
        let requests = await getFriendRequests(user_id);
        res.status(200).send(requests);
    } catch (err){
        res.status(422).send({err: 'couldnt fetch notifications'});
    }
});
router.get('/friendcount/:user_id', async (req, res) => {
    let {user_id} = req.params;
    try{
        let data = await fetchFollowers(user_id);
           res.status(200).send(data); 
    } catch (err) {
        res.status(422).send({err: err});
    }

});

module.exports = router;