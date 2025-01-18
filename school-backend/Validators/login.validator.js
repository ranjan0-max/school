const Joi = require("joi");

const loginSchema = Joi.object({
  user_id: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().min(6).optional().allow(null),
});

module.exports = loginSchema;
