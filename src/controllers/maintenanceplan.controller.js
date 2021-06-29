const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const getMaintenancePlans = catchAsync(async (req, res) => {
    const maintenancePlans = await maintenancePlanService.getMaintenancePlans(req.user);
    res.status(httpStatus.OK).send(maintenancePlans);
});

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getMaintenancePlans,
    create
}