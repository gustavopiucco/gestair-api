const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const getMaintenancePlansActivities = catchAsync(async (req, res) => {
    const maintenancePlansActivities = await maintenancePlanService.getMaintenancePlansActivities(req.user, req.params.maintenancePlanId);
    res.status(httpStatus.OK).send(maintenancePlansActivities);
});

const createActivity = catchAsync(async (req, res) => {
    const created = await maintenancePlanService.createActivity(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const deleteActivity = catchAsync(async (req, res) => {
    await maintenancePlanService.deleteActivity(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getMaintenancePlansActivities,
    createActivity,
    deleteActivity
}