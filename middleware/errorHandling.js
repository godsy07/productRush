
const handleServerError = (res, controller) => {
  // console.log("controller: ", controller)
  return res.status(500).json({ status: false, message: "Something went wrong in server." });
}

module.exports = { handleServerError }