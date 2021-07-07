const Joi = require('joi');

const getAllUnitsByCustomerId = {
    params: Joi.object().keys({
        customerId: Joi.number().integer().required(),
    }),
};

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        floors: Joi.number().integer().required(),
        address: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        federalUnit: Joi.string().required(),
        cep: Joi.string().required(),
        customerId: Joi.number().integer().required(),
    }),
};

const createUnitUserLink = {
    body: Joi.object().keys({
        unitId: Joi.number().integer().required(),
        userId: Joi.number().integer().required()
    }),
};

module.exports = {
    getAllUnitsByCustomerId,
    create,
    createUnitUserLink
};