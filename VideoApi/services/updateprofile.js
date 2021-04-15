const { dbMethods } = require("../models/updateprofile");

const updateBio = async (user_id, bio) => {
  try {
    await dbMethods.updateBio(user_id, bio);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  updateBio,
};
