const Joi = require('joi');

const ProductSchema = Joi.object({
idcategory : Joi.number().integer().min(0).max(255).required(),
denomination: Joi.string().min(10).max(255).required(),
additional_info: Joi.string().min(0).max(100).optional(),
price: Joi.number().precision(2),
stock : Joi.number().integer().min(0).max(100)
});

module.exports = ProductSchema
