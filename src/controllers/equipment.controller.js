const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const equipmentService = require('../services/equipment.service');

const getAllEquipments = catchAsync(async (req, res) => {
    const equipments = await equipmentService.getAllEquipmentsByEnviromentId(req.params.enviromentId);
    res.status(httpStatus.OK).send(equipments);
});

const getAllSystemTypes = catchAsync(async (req, res) => {
    const systemTypes = await equipmentService.getAllSystemTypes();
    res.status(httpStatus.OK).send(systemTypes);
});

const getAllEquipmentTypes = catchAsync(async (req, res) => {
    const equipmentTypes = await equipmentService.getAllEquipmentTypes();
    res.status(httpStatus.OK).send(equipmentTypes);
});

const getAllCapacityTypes = catchAsync(async (req, res) => {
    const capacityTypes = await equipmentService.getAllCapacityTypes();
    res.status(httpStatus.OK).send(capacityTypes);
});

const getAllBrandModels = catchAsync(async (req, res) => {
    const brandModels = await equipmentService.getAllBrandModels();
    res.status(httpStatus.OK).send(brandModels);
});

const create = catchAsync(async (req, res) => {
    await equipmentService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

const setMaintenancePlan = catchAsync(async (req, res) => {
    await equipmentService.setMaintenancePlanId(req.user, req.params.id, req.body);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getAllEquipments,
    getAllSystemTypes,
    getAllEquipmentTypes,
    getAllCapacityTypes,
    getAllBrandModels,
    create,
    setMaintenancePlan
}