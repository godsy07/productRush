const Joi = require("joi")

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(6).max(40).required().label("Password")
})

const signUpSchema = Joi.object({
  first_name: Joi.string().min(1).max(30).required().label("First Name"),
  last_name: Joi.string().min(1).max(30).required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  phone_no: Joi.string().min(10).max(10).required().label("Phone No"),
  password: Joi.string().min(6).max(40).required().label("Password")
})

module.exports = { loginSchema, signUpSchema }