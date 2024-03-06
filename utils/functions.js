const User = require("../models/User")

const getUserByUserId = async(user_id) => {
  const user = await User.findById(user_id);
  return user;
}

module.exports = { getUserByUserId }