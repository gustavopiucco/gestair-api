const Joi = require('joi');

const getMaintenancePlansActivities = {
    params: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required()
    }),
};

const getMaintenancePlansActivitiesChecklists = {
    params: Joi.object().keys({
        maintenancePlanActivityId: Joi.number().integer().required()
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
        frequency: Joi.string().required().valid('daily', 'weekly', 'monthly', 'bimonthly', 'quarterly', 'biannual', 'annual'),
        time: Joi.number().integer().required(),
        maintenancePlanId: Joi.number().integer().required(),
    }),
};

const createActivityChecklist = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        valueType: Joi.string(),
        minValue: Joi.number(),
        maxValue: Joi.number(),
        done: Joi.bool(),
        maintenancePlanActivityId: Joi.number().integer().required(),
    }),
};

const deleteActivityById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};


const deleteActivityChecklistById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = {
    getMaintenancePlansActivities,
    getMaintenancePlansActivitiesChecklists,
    create,
    createActivity,
    createActivityChecklist,
    deleteActivityById,
    deleteActivityChecklistById
};