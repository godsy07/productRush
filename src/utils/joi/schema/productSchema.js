const Joi = require("joi")

const addProductSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().label("Product Name"),
  brand: Joi.string().max(40).required().label("Brand"),
  model: Joi.string().max(100).required().label("Model"),
  price: Joi.number().required().label("Price"),
  category_id: Joi.string().allow(null).optional().label("Parent ID")
})

module.exports = { addProductSchema }