const Joi = require('joi');
const { date } = require('./custom.validation');

const getByUserId = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required()
    }),
    query: Joi.object().keys({
        date: Joi.custom(date).required()
    }),
};

const getAllByCustomerId = {
    params: Joi.object().keys({
        customerId: Joi.number().integer().required()
    }),
    query: Joi.object().keys({
        date: Joi.custom(date).required()
    }),
};

const getAllByCompanyId = {
    params: Joi.object().keys({
        companyId: Joi.number().integer().required()
    }),
    query: Joi.object().keys({
        date: Joi.custom(date).required()
    }),
};

const getAllByMaintenancePlanId = {
    params: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required()
    })
};


const create = {
    body: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required(),
        startDate: Joi.string().required().custom(date),
    }),
};

const createSingle = {
    body: Joi.object().keys({
        activityId: Joi.number().integer().required(),
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
    getAllByCustomerId,
    getAllByCompanyId,
    getAllByMaintenancePlanId,
    create,
    createSingle,
    setUserId
};