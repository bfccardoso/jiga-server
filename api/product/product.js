// validation/productValidation.js
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  family: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(100).allow(''),
  code: Joi.string().min(3).max(10).allow('')
});

module.exports = {
    productSchema
};
