const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const acitivityService = require('../services/activity.service');

const getAllByMaintenancePlanId = catchAsync(async (req, res) => {
    const maintenancePlansActivities = await acitivityService.getAllByMaintenancePlanId(req.user, req.params.maintenancePlanId);
    res.status(httpStatus.OK).send(maintenancePlansActivities);
});

const create = catchAsync(async (req, res) => {
    const created = await acitivityService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const remove = catchAsync(async (req, res) => {
    await acitivityService.remove(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getAllByMaintenancePlanId,
    create,
    remove
}