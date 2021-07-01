const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const enviromentService = require('../services/enviroment.service');

const getAllEnviroments = catchAsync(async (req, res) => {
    const enviroments = await enviromentService.getAllEnviromentsByUnitId(req.params.unitId);
    res.status(httpStatus.OK).send(enviroments);
});

const create = catchAsync(async (req, res) => {
    await enviromentService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getAllEnviroments,
    create
}