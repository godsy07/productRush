const SchemaKeys = require("./keys")
const { loginSchema, signUpSchema } = require("./userSchema")
const { addProductSchema, addProductReviewSchema } = require("./productSchema")
const { addCategorySchema, addCategoryFilterSchema } = require("./categorySchema")

const schemas = {
  [SchemaKeys.LOGIN]: loginSchema,
  [SchemaKeys.SIGNUP]: signUpSchema,
  [SchemaKeys.ADD_PRODUCT]: addProductSchema,
  [SchemaKeys.ADD_CATEGORY]: addCategorySchema,
  [SchemaKeys.ADD_CATEGORY_FILTER]: addCategoryFilterSchema,
  [SchemaKeys.ADD_PRODUCT_REVIEW]: addProductReviewSchema,
}

module.exports = schemas