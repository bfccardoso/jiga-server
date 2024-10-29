// validation/productValidation.js
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  code: Joi.string().min(3).max(10).required()
});

module.exports = {
    productSchema
};
