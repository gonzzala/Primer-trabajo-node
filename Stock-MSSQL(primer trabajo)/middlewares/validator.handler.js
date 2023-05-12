const Joi = require('joi');

function validatorHandler(schema) {
   return (req, res, next) => {
    const data = req.body;
    const err  = schema.validate(data);
    if (err.error) {
        next(res.status(501).json(err.error.details[0].message));
    }
    else {
      next();
    }
  }
}

module.exports = validatorHandler;
