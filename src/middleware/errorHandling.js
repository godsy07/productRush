
const handleServerError = (res, controller, message = '') => {
  // console.log("controller: ", controller)
  return res.status(500).json({ status: false, message: message ? message : "Something went wrong in server." });
}

module.exports = { handleServerError }