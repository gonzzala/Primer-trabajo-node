const Joi = require('joi');

const MovementSchema = Joi.object({
idproduct : Joi.number().integer().min(0).max(2000000).required(),
quantity : Joi.number().integer().min(-2000).max(2000).required(),
observations: Joi.string().min(10).max(255).required()
}).required();

module.exports = MovementSchema
