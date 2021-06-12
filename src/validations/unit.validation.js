const Joi = require('joi');

const createUnit = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        floors: Joi.number().integer().required()
    }),
};

module.exports = {
    createUnit
};