const bcrypt = require("bcrypt");
const { dbMethods } = require("../models/createuser");

const checkUsers = async (username) => {
  try {
    let getUsers = await dbMethods.getUsers(username);
    if (getUsers.length > 0) {
      getUsers = true;
    } else {
      getUsers = false;
    }
    return getUsers;
  } catch (err) {
    console.log(err);
    console.log("database error");
    throw new Error(err);
  }
};
const insertUsers = async (username, password, confirmPassword) => {
  const errors = {};
  const saltRounds = 10;
  const regex = /^[a-zA-Z0-9-_]{7,}$/;
  const regexTestUsername = regex.test(username);
  const userPassword = password;
  const passwordTest = userPassword.length >= 6 ? userPassword : false;
  const checkExistance = await checkUsers(username);
  console.log(`${checkExistance}is the existence`);
  if (!regexTestUsername) {
    errors.error = "invalid username";
    errors.authenticated = false;
    return errors;
  }
  if (checkExistance === true) {
    errors.authenticated = false;
    errors.error = "username already exists";
    return errors;
  }
  if (password !== confirmPassword) {
    errors.authenticated = false;
    errors.error = "passwords dont match";
    return errors;
  }
  if (passwordTest === false) {
    errors.authenticated = false;
    errors.error = "password is too short";
    return errors;
  }
  try {
    const password = await bcrypt.hash(userPassword, saltRounds);
    const { user_id } = await dbMethods.insertUsers(username, password);
    const initAcc = {
      authenticated: true,
      user_id,
    };
    return initAcc;
  } catch (err) {
    console.log(err);
    console.log('some error');
    errors.authenticated = false;
    errors.error = "network error";
    return errors;
  }
};

module.exports = {
  insertUsers,
};
