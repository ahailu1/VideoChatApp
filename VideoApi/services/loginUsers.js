const bcrypt = require("bcrypt");
const { dbMethods } = require("../models/loginuser");

const loginUser = async (username, password) => {
  try {
    const getPassword = await dbMethods.loginUser(username);
    const userPassword =
      typeof getPassword[0] === "undefined"
      ? "no user"
      : getPassword[0].password;

    const comparePassword = await bcrypt.compare(password, userPassword);
    if (comparePassword) {
      const data = {
        authenticated: true,
        user_id: getPassword[0].user_id,
      };
      return data;
    }
    if (!comparePassword) {
      const isAuth = {
        authenticated: false,
        user_id: false,
      };
      return isAuth;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  loginUser,
};
