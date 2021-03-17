const { router, app } = require("../config/express.js");
const {fetchAllUsers, getFriendRequests, fetchFriendCount, fetchFriendsList, fetchFriendsId, fetchFriendInfo} = require("../services/fetchusers");

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
        let data = await fetchFriendCount(user_id);
           res.status(200).send(data); 
    } catch (err) {
        res.status(422).send({err: err});
    }
});
    router.get('/friendslist/:user_id', async (req, res) => {
            let {user_id} = req.params;
        try {
            let friendsList = await fetchFriendsList(user_id);
            res.status(200).send(friendsList);
        } catch (err) {

            res.status(422).send(err);
        }
    })
    router.get('/friendsId/:user_id', async (req, res) => {
        let {user_id} = req.params;
        try {
            let myFriends = await fetchFriendsId(user_id);
            res.status(200).send(myFriends);
        } catch (err) {

            res.status(422).send(err);
        }
    });
    router.get('/friendinfo/:user_id', async (req, res) => {
        let {user_id} = req.params;
        try {
            let myFriends = await fetchFriendInfo(user_id);
            res.status(200).send(myFriends);
        } catch (err) {
            res.status(422).send(err);
        }
    })

module.exports = router;