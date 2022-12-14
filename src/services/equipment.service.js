const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const equipmentModel = require('../models/equipment.model');
const enviromentModel = require('../models/enviroment.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const scheduleService = require('../services/schedule.service');

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
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ambiente não está cadastrado');
    }

    await equipmentModel.create(body.name, body.serialNumber, body.tag, body.systemTypeId, body.equipmentTypeId, body.capacityTypeId, body.capacityValue, body.brandModelId, body.enviromentId);
}

// async function setMaintenancePlanId(loggedInUser, equipmentId, body) {
//     if (!await equipmentModel.exists(equipmentId)) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Este equipamento não existe');
//     }

//     if (!await maintenancePlanModel.exists(body.maintenancePlanId)) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Este plano de manutenção não existe');
//     }

//     const equipmentCompanyId = (await equipmentModel.getEquipmentCompanyIdByEquipmentId(equipmentId));

//     if (loggedInUser.companyId !== equipmentCompanyId) {
//         throw new ApiError(httpStatus.FORBIDDEN, 'Este equipamento não pertence a sua empresa');
//     }

//     const maintenancePlan = await maintenancePlanModel.getById(body.maintenancePlanId);

//     if (loggedInUser.companyId !== maintenancePlan.company_id) {
//         throw new ApiError(httpStatus.FORBIDDEN, 'Este plano de manutenção não pertence a sua empresa');
//     }

//     if (await equipmentModel.maintenancePlanExists(body.maintenancePlanId)) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção já está vinculado a um equipamento');
//     }

//     await scheduleService.generate(equipmentId, body.maintenancePlanId, body.startDate);

// }

module.exports = {
    getAllEquipmentsByEnviromentId,
    getAllSystemTypes,
    getAllEquipmentTypes,
    getAllCapacityTypes,
    getAllBrandModels,
    create
}