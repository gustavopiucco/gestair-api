const Joi = require('joi');
const { date } = require('./custom.validation');

const create = {
    body: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required(),
        startDate: Joi.string().required().custom(date),
    }),
};

module.exports = {
    create
};