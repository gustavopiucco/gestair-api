const Joi = require('joi');

const getAllByMaintenancePlanId = {
    params: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required()
    }),
};

const createActivity = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        frequency: Joi.string().required().valid('daily', 'weekly', 'monthly', 'bimonthly', 'quarterly', 'biannual', 'annual'),
        time: Joi.number().integer().required(),
        maintenancePlanId: Joi.number().integer().required()
    }),
};

const deleteActivityById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = {
    getAllByMaintenancePlanId,
    createActivity,
    deleteActivityById
}