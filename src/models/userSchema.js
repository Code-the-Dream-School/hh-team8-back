const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().min(8).required(),
    role_id:Joi.number()
});

module.exports = userSchema;