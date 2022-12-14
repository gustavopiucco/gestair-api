const Joi = require('joi');
const { date } = require('./custom.validation');

const getAllEquipmentsByEnviromentId = {
    params: Joi.object().keys({
        enviromentId: Joi.number().integer().required(),
    }),
};

const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        serialNumber: Joi.string().required(),
        tag: Joi.string().required(),
        systemTypeId: Joi.number().integer().required(),
        equipmentTypeId: Joi.number().integer().required(),
        capacityTypeId: Joi.number().integer().required(),
        capacityValue: Joi.number().integer().required(),
        brandModelId: Joi.number().integer().required(),
        enviromentId: Joi.number().integer().required()
    }),
};

const setMaintenancePlanId = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        maintenancePlanId: Joi.number().integer().required(),
        startDate: Joi.custom(date).required(),
    }),
};

module.exports = {
    getAllEquipmentsByEnviromentId,
    create,
    setMaintenancePlanId
};