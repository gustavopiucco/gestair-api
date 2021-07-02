const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const equipmentService = require('../services/equipment.service');

const getAllEquipments = catchAsync(async (req, res) => {
    const equipments = await equipmentService.getAllEquipmentsByEnviromentId(req.params.enviromentId);
    res.status(httpStatus.OK).send(equipments);
});

const getAllSystemTypes = catchAsync(async (req, res) => {
    const systemTyes = await equipmentService.getAllSystemTypes();
    res.status(httpStatus.OK).send(systemTyes);
});

const create = catchAsync(async (req, res) => {
    await equipmentService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getAllEquipments,
    getAllSystemTypes,
    create
}