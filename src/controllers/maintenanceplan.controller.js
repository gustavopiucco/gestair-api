const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const getMaintenancePlans = catchAsync(async (req, res) => {
    const maintenancePlans = await maintenancePlanService.getMaintenancePlans(req.user);
    res.status(httpStatus.OK).send(maintenancePlans);
});

const getMaintenancePlansActivities = catchAsync(async (req, res) => {
    const maintenancePlansActivities = await maintenancePlanService.getMaintenancePlansActivities(req.user, req.params.maintenancePlanId);
    res.status(httpStatus.OK).send(maintenancePlansActivities);
});

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

const createActivity = catchAsync(async (req, res) => {
    await maintenancePlanService.createActivity(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

const createActivityChecklist = catchAsync(async (req, res) => {
    await maintenancePlanService.createActivityChecklist(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getMaintenancePlans,
    getMaintenancePlansActivities,
    create,
    createActivity,
    createActivityChecklist
}