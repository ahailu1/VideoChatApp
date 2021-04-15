const { router, app } = require("../config/express.js");
const {
  fetchAllUsers,
  getFriendRequests,
  fetchFriendCount,
  fetchFriendsList,
  fetchFriendsId,
  fetchFriendInfo,
} = require("../services/fetchusers");

router.get("/fetch/allusers/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const allUsers = await fetchAllUsers(user_id);
    res.status(200).send({ users: allUsers });
  } catch (err) {
    res.status(422).send({ error: "error" });
  }
});
router.get("/getrequests/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const requests = await getFriendRequests(user_id);
    res.status(200).send(requests);
  } catch (err) {
    res.status(422).send({ err: "couldnt fetch notifications" });
  }
});
router.get("/friendcount/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await fetchFriendCount(user_id);
    res.status(200).send(data);
  } catch (err) {
    res.status(422).send({ err });
  }
});
router.get("/friendslist/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const friendsList = await fetchFriendsList(user_id);
    res.status(200).send(friendsList);
  } catch (err) {
    res.status(422).send(err);
  }
});
router.get("/friendsId/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const myFriends = await fetchFriendsId(user_id);
    res.status(200).send(myFriends);
  } catch (err) {
    res.status(422).send(err);
  }
});
router.get("/friendinfo/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const myFriends = await fetchFriendInfo(user_id);
    res.status(200).send(myFriends);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
