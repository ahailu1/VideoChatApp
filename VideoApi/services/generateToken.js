const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

const createToken = async (username) => {
  // ideally secret key is stored somewhere on server. we should aquire this key by reading the file
  try {
    const token = await jwt.sign(username, secretKey);
    return token;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const authenticateToken = async (username, bearer) => {};

module.exports = {
  createToken,
};
