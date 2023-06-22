const Joi = require('joi')

function registerValidation(validationInput) {
  const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return userValidationSchema.validate(validationInput)
}

module.exports = { registerValidation }
