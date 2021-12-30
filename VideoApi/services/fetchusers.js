const { dbMethods } = require("../models/getfriends");

const fetchAllUsers = async (user_id) => {
  try {
    const allUsers = await dbMethods.getAllUsers(user_id);
    return allUsers;
  } catch (err) {
    throw new Error(err);
  }
};
const getFriendRequests = async (user_id) => {
  try {
    const requests = await dbMethods.getFriendRequests(user_id);
    return requests;
  } catch (err) {
    throw new Error(err);
  }
};
const fetchFriendCount = async (user_id) => {
  try {
    const followers = await dbMethods.getFriendCount(user_id);
    return followers;
  } catch (err) {
    throw new Error(err);
  }
};
const fetchFriendsList = async (user_id) => {
  try {
    const friendsList = await dbMethods.getFriendsList(user_id);
    return friendsList;
  } catch (err) {
    throw new Error(err);
  }
};
const fetchFriendsId = async (user_id) => {
  try {
    const friendsList = await dbMethods.getFriendsId(user_id);
    return friendsList;
  } catch (err) {
    throw new Error(err);
  }
};
const fetchFriendInfo = async (user_id) => {
  try {
    const friendsList = await dbMethods.getFriendInfo(user_id);
    return friendsList;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  fetchAllUsers,
  getFriendRequests,
  fetchFriendCount,
  fetchFriendsList,
  fetchFriendsId,
  fetchFriendInfo,
};
