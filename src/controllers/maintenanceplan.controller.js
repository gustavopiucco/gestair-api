const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const getAll = catchAsync(async (req, res) => {
    const maintenancePlans = await maintenancePlanService.getAll(req.user);
    res.status(httpStatus.OK).send(maintenancePlans);
});

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});


module.exports = {
    getAll,
    create
}