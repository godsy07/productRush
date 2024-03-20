const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const controller = "UserController";

const login = async (req, res) => {
  try {
    const { email, password, remember_me } = req.body

    const { error_message } = validateInput("loginSchema", { email, password })
    if (error_message) {
      return res.status(400).json({ status: false, message: error_message });
    }

    const user_email = email.toLowerCase();
    const user = await User.findOne({ email: user_email });
    if (!user) {
      return res.status(400).json({ status: false, message: "Credentials are invalid." })
    }
    // compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Credentials are invalid." })
    }
    
    if (user.role !== 'admin') {
      return res.status(401).json({ status: false, message: "You are not authorized." })
    }

    let expireTime = "5d";
    if (remember_me) {
      expireTime = "14d";
    }
    const secretkey = process.env.JWT_LOGIN_TOKEN;
    const token = jwt.sign(
      {
        id: user._id, email: user_email
      },
      secretkey,
      { expiresIn: expireTime },
    );

    return res.status(200).json({ status: true, token, message: 'You have been logged in.' });
  } catch (e) {
    return handleServerError(res, controller);
  }
}

module.exports = {
  login,
}