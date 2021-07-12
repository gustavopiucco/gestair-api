const Joi = require('joi');
const { date } = require('./custom.validation');

const create = {
    body: Joi.object().keys({
        startDate: Joi.string().required().custom(date),
    }),
};

module.exports = {
    create
};