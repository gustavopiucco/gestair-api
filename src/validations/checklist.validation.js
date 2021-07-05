const Joi = require('joi');

const getAllByActivityId = {
    params: Joi.object().keys({
        activityId: Joi.number().integer().required()
    }),
};

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        valueType: Joi.string(),
        minValue: Joi.number(),
        maxValue: Joi.number(),
        done: Joi.bool(),
        activityId: Joi.number().integer().required(),
    }),
};

const remove = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

module.exports = {
    getAllByActivityId,
    create,
    remove
};