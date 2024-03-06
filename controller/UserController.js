const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validateInput = require("../utils/joi/validate");
const { getUserByUserId } = require("../utils/functions");
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

    let expireTime = "5d";
    if (remember_me) {
      expireTime = "14d";
    }
    const secretkey = process.env.PWD_TOKEN;
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

const signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, role, phone_no, password, confirm_password } = req.body

    const { error_message } = validateInput("signUpSchema", { first_name, last_name, email, role, phone_no, password, confirm_password })
    if (error_message) {
      return res.status(400).json({ status: false, message: error_message });
    }

    const user_email = email.toLowerCase();
    let user = await User.findOne({ email: user_email });
    if (user) {
      return res.status(400).json({ status: false, message: 'Account with this email already exists.' });
    }

    user = await User.create({ first_name, last_name, email: user_email, phone_no, password });

    return res.status(200).json({ status: true, user, message: 'You have successfully signed up.' });
  } catch (e) {
    return handleServerError(res, controller);
  }
}

const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await getUserByUserId(user_id);

    return res.status(200).json({ status: true, user, message: "Fetched user details." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({ status: true, user: req.user, message: "Fetched user details." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

module.exports = {
  login,
  signUp,
  getUser,
  getCurrentUser,
}