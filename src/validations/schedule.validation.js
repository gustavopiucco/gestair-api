const Joi = require('joi');
const { date } = require('./custom.validation');

const getByUserId = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required()
    }),
};

const getByCompanyId = {
    params: Joi.object().keys({
        companyId: Joi.number().integer().required()
    }),
};

const create = {
    body: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required(),
        startDate: Joi.string().required().custom(date),
    }),
};

module.exports = {
    getByUserId,
    getByCompanyId,
    create
};