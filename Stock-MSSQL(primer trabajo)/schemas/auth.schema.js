const Joi = require('joi');

const AuthSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(), 
  email: Joi.string().min(3).max(100).required().email().required(),
  password: Joi.string().min(3).max(50).password.required(),
  isadmin: Joi.boolean().default(0).required(false) 
});

module.exports = AuthSchema
