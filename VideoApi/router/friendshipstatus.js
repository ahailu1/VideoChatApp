const { router } = require("../config/express.js");
const { initFriendship } = require("../services/setFriendStatus");

router.post("/addfriend", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    await initFriendship.addFriend(user_id, friend_id);
    res.status(200).send({ data: "friend added" });
  } catch (err) {
    res.status(422).send({ err: "couldnt add friend" });
    throw new Error(err);
  }
});

router.delete("/deletefriend", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    await initFriendship.deleteFriend(user_id, friend_id);
    res.status(200).send(true);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.put("/confirmrequest/", async (req, res) => {
  const { user_id, friend_id, status_code } = req.body;
});

module.exports = router;
