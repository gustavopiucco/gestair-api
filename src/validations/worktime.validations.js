const Joi = require('joi');
const weekDay = require('../config/weekday');

const getWorkTimeById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getWorkTimeQuery = {
    query: Joi.object().keys({
        userId: Joi.number().integer(),
    })
};

const createWorkTime = {
    body: Joi.object().keys({
        userId: Joi.number().integer().required(),
        weekDay: Joi.string().required().valid(weekDay.Monday, weekDay.Tuesday, weekDay.Wednesday, weekDay.Thursday, weekDay.Friday, weekDay.Saturday, weekDay.Sunday),
        workFrom: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        workTo: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    })
};

const deleteWorkTimeById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};


module.exports = {
    getWorkTimeById,
    getWorkTimeQuery,
    createWorkTime,
    deleteWorkTimeById
};