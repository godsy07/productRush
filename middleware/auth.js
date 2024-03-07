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
        "Auth token is missing. Please refresh the page and try logging in again.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.PWD_TOKEN);
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

module.exports = { isAuth }