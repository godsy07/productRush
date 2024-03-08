const schemas = require("./schema")

const validateInput = (schemaName, inputObject) => {
  const schema = schemas[schemaName]
  const validate = schema.validate({ ...inputObject });
  const { error } = validate;
  if (error) {
    return { isValid: false, error_message: error.details[0].message }
  }

  return { isValid: true }
}

module.exports = validateInput