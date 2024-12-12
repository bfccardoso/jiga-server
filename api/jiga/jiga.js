// validation/productValidation.js
const Joi = require('joi');

const jigaSchema = Joi.object({
  name: Joi.string().min(3).max(50).trim().required(),
  code: Joi.string().min(3).max(10).trim().required(),
  productId: Joi.number().integer().positive().required()
});

module.exports = {
    jigaSchema
};
