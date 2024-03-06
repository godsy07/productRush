const { loginSchema, signUpSchema } = require("./userSchema")

const schemas = {
  loginSchema: loginSchema,
  signUpSchema: signUpSchema
}

module.exports = schemas