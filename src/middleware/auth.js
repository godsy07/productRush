const jwt = require('jsonwebtoken');

const { getUserByUserId } = require("../utils/functions");

const isAuth = async (req, res, next) => {
  let token = req.cookies && req.cookies.product_rush_token;

  if (token === undefined) {
    token = req.body.headers && req.body.headers.Cookie;
  }

  if (!token) {
    return res.status(403).json({
      status: false,
      message:
        "You should be logged in to perform this action.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
    const user = await getUserByUserId(decoded.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User does not exists." });
    }
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      status: false,
      message:
        "Invalid token. Please refresh the page and try logging in again.",
    });
  }
  return next();
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      status: false,
      message: 'You are not authorized for this action.',
    });
  }
  next();
}

const isSeller = (req, res, next) => {
  if (req.user.role !== 'seller' && req.user.role !== 'admin') {
    return res.status(401).json({
      status: false,
      message: 'You are not authorized for this action.',
    });
  }
  next();
}

module.exports = { isAuth, isAdmin, isSeller }