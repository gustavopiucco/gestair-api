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

const getMaintenancePlansActivitiesChecklists = catchAsync(async (req, res) => {
    const maintenancePlansActivitiesChecklists = await maintenancePlanService.getMaintenancePlansActivitiesChecklists(req.user, req.params.maintenancePlanActivityId);
    res.status(httpStatus.OK).send(maintenancePlansActivitiesChecklists);
});

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

const createActivity = catchAsync(async (req, res) => {
    const created = await maintenancePlanService.createActivity(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const createActivityChecklist = catchAsync(async (req, res) => {
    const created = maintenancePlanActivityChecklist = await maintenancePlanService.createActivityChecklist(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const deleteActivity = catchAsync(async (req, res) => {
    await maintenancePlanService.deleteActivity(req.params.id);
    res.status(httpStatus.OK).send();
});

const deleteActivityChecklist = catchAsync(async (req, res) => {
    await maintenancePlanService.deleteActivityChecklist(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getMaintenancePlans,
    getMaintenancePlansActivities,
    getMaintenancePlansActivitiesChecklists,
    create,
    createActivity,
    createActivityChecklist,
    deleteActivity,
    deleteActivityChecklist
}