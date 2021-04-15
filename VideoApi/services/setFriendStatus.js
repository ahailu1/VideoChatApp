const { dbMethods } = require("../models/initfriendship");

const initFriendship = {};

initFriendship.addFriend = async (username, friendname) => {
  try {
    await dbMethods.addFriend(username, friendname);
  } catch (err) {
    throw new Error(err);
  }
};
initFriendship.deleteFriend = async (user_id, friend_id) => {
  try {
    await dbMethods.deleteFriend(user_id, friend_id);
  } catch (err) {
    throw new Error(err);
  }
};

initFriendship.confirmFriend = async (user_id, friend_id, status_code) => {
  try {
    await dbMethods.updateFriend(user_id, friend_id);
  } catch (err) {
    throw new Error(err);
  }
};
initFriendship.denyFriend = async (user_id, friend_id, status_code) => {
  try {
    await dbMethods.updateFriend(user_id, friend_id, status_code);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  initFriendship,
};
