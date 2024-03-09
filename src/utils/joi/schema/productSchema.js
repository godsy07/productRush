const Joi = require("joi")

const addProductSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().label("Product Name"),
  brand: Joi.string().max(40).required().label("Brand"),
  model: Joi.string().max(100).required().label("Model"),
  category_id: Joi.string().required().label("Category ID"),
  price_details: Joi.array().items(Joi.object({ filter: Joi.string().max(40).required().label("Filter"), price: Joi.number().required().label('Price') })).required().label('Price Details'),
})

module.exports = { addProductSchema }