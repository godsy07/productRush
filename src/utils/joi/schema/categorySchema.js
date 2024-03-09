const Joi = require("joi")

const addCategorySchema = Joi.object({
  name: Joi.string().min(3).max(40).required().label("Category Name"),
  parent_id: Joi.string().allow(null).optional().label("Parent ID")
})

const addCategoryFilterSchema = Joi.object({
  filters: Joi.array().items(Joi.string().required()).required().label("Filters"),
  category_id: Joi.string().required().label("Category ID")
})

module.exports = { addCategorySchema, addCategoryFilterSchema }