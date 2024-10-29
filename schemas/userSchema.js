// validation/userValidation.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(7).max(100).required()
});

module.exports = { userSchema };