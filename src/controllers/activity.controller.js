const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const activityService = require('../services/activity.service');

const getAllByMaintenancePlanId = catchAsync(async (req, res) => {
    const maintenancePlansActivities = await activityService.getAllByMaintenancePlanId(req.user, req.params.maintenancePlanId);
    res.status(httpStatus.OK).send(maintenancePlansActivities);
});

const create = catchAsync(async (req, res) => {
    const created = await activityService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const remove = catchAsync(async (req, res) => {
    await activityService.remove(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getAllByMaintenancePlanId,
    create,
    remove
}