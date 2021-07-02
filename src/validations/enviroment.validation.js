const Joi = require('joi');

const getAllEnviromentsByUnitId = {
    params: Joi.object().keys({
        unitId: Joi.number().integer().required(),
    }),
};

const createEnviroment = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        floor: Joi.number().integer().required(),
        area: Joi.number().integer().required(),
        activityType: Joi.string().required(),
        fixedOccupants: Joi.number().integer().required(),
        floatingOccupants: Joi.number().integer().required(),
        thermalLoad: Joi.number().integer().required(),
        unitId: Joi.number().integer().required()
    }),
};

module.exports = {
    getAllEnviromentsByUnitId,
    createEnviroment
};