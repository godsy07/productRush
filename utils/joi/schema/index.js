const { addCategorySchema } = require("./categorySchema")
const { loginSchema, signUpSchema } = require("./userSchema")

const schemas = {
  loginSchema: loginSchema,
  signUpSchema: signUpSchema,
  addCategorySchema: addCategorySchema,
}

module.exports = schemas