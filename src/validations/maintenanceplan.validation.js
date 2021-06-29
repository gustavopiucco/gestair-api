const Joi = require('joi');

const getMaintenancePlansActivities = {
    params: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required()
    }),
};

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        // startDate: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
        // endDate: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required()
    }),
};

const createActivity = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        frequency: Joi.number().integer().required(),
        time: Joi.number().integer().required(),
        maintenancePlanId: Joi.number().integer().required(),
    }),
};

module.exports = {
    getMaintenancePlansActivities,
    create,
    createActivity
};