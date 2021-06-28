const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        startDate: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
        endDate: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required()
    }),
};

module.exports = {
    create
};