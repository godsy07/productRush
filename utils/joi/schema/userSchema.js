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
  password: Joi.string().min(6).max(40).required().label("Password"),
  confirm_password: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        console.log("error code: ", err.code, err.value)
        switch (err.code) {
          case 'any.required':
            err.message = `Please confirm your password`;
            break;
          case 'any.only':
            if (err.value) {
              err.message = `Both passwords do not match`;
            } else {
              err.message = `Please confirm your password`;
            }
            break;
          default:
            err.message = `Both passwords do not match`;
            break;
        }
      });
      return errors;
    })
})

module.exports = { loginSchema, signUpSchema }