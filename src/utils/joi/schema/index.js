const { addProductSchema } = require("./productSchema")
const { loginSchema, signUpSchema } = require("./userSchema")
const { addCategorySchema, addCategoryFilterSchema } = require("./categorySchema")

const schemas = {
  loginSchema: loginSchema,
  signUpSchema: signUpSchema,
  addProductSchema: addProductSchema,
  addCategorySchema: addCategorySchema,
  addCategoryFilterSchema: addCategoryFilterSchema,
}

module.exports = schemas