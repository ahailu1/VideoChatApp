const { dbMethods } = require("../models/getprofile");

const getBio = async (user_id) => {
  try {
    const res = await dbMethods.getBio(user_id);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getBio,
};
