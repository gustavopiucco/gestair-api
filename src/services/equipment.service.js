const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const equipmentModel = require('../models/equipment.model');
const enviromentModel = require('../models/enviroment.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getAllEquipmentsByEnviromentId(enviromentId) {
    const equipments = await equipmentModel.getAllEquipmentsByEnviromentId(enviromentId);

    return equipments;
}

async function getAllSystemTypes() {
    const systemTypes = await equipmentModel.getAllSystemTypes();

    return systemTypes;
}

async function getAllEquipmentTypes() {
    const systemTypes = await equipmentModel.getAllEquipmentTypes();

    return systemTypes;
}

async function getAllCapacityTypes() {
    const capacityTypes = await equipmentModel.getAllCapacityTypes();

    return capacityTypes;
}

async function getAllBrandModels() {
    const brandModels = await equipmentModel.getAllBrandModels();

    return brandModels;
}

async function create(body) {
    if (!await equipmentModel.systemTypeExists(body.systemTypeId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este tipo de sistema não está cadastrado');
    }

    if (!await equipmentModel.equipmentTypeExists(body.equipmentTypeId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este tipo de sistema não está cadastrado');
    }

    if (!await equipmentModel.capacityTypeExists(body.capacityTypeId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este tipo de capacidade não está cadastrado');
    }

    if (!await equipmentModel.brandModelExists(body.brandModelId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta marca/modelo não está cadastrado');
    }

    if (!await enviromentModel.exists(body.enviromentId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta ambiente não está cadastrado');
    }

    await equipmentModel.create(body.name, body.serialNumber, body.tag, body.systemTypeId, body.equipmentTypeId, body.capacityTypeId, body.capacityValue, body.brandModelId, body.enviromentId);
}

async function setMaintenancePlanId(id, maintenancePlanId) {
    if (!await equipmentModel.exists(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este equipamento não existe');
    }

    //checar se o plano de manutenção existe
    if (!await maintenancePlanModel.exists(maintenancePlanId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    await equipmentModel.setMaintenancePlan(id, maintenancePlanId);
}

module.exports = {
    getAllEquipmentsByEnviromentId,
    getAllSystemTypes,
    getAllEquipmentTypes,
    getAllCapacityTypes,
    getAllBrandModels,
    setMaintenancePlanId,
    create
}