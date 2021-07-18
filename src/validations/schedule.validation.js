const Joi = require('joi');
const { date } = require('./custom.validation');

const getByUserId = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        date: Joi.custom(date).required()
    }),
};

const getByCompanyId = {
    params: Joi.object().keys({
        companyId: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        date: Joi.custom(date).required()
    }),
};

const create = {
    body: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required(),
        startDate: Joi.string().required().custom(date),
    }),
};

const setUserId = {
    body: Joi.object().keys({
        userId: Joi.number().integer().required()
    }),
}

module.exports = {
    getByUserId,
    getByCompanyId,
    create,
    setUserId
};