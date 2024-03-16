const { loginSchema, signUpSchema } = require("./userSchema")
const { addProductSchema, addProductReviewSchema } = require("./productSchema")
const { addCategorySchema, addCategoryFilterSchema } = require("./categorySchema")

const schemas = {
  loginSchema: loginSchema,
  signUpSchema: signUpSchema,
  addProductSchema: addProductSchema,
  addCategorySchema: addCategorySchema,
  addCategoryFilterSchema: addCategoryFilterSchema,
  addProductReviewSchema: addProductReviewSchema,
}

module.exports = schemas