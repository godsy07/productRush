const Joi = require("joi")

const addCategorySchema = Joi.object({
  name: Joi.string().min(3).max(40).required().label("Category Name"),
  parent_id: Joi.string().allow(null).optional().label("Parent ID")
})

module.exports = { addCategorySchema }