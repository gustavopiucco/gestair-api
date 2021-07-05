const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const getMaintenancePlans = catchAsync(async (req, res) => {
    const maintenancePlans = await maintenancePlanService.getMaintenancePlans(req.user);
    res.status(httpStatus.OK).send(maintenancePlans);
});

const getMaintenancePlansActivitiesChecklists = catchAsync(async (req, res) => {
    const maintenancePlansActivitiesChecklists = await maintenancePlanService.getMaintenancePlansActivitiesChecklists(req.user, req.params.maintenancePlanActivityId);
    res.status(httpStatus.OK).send(maintenancePlansActivitiesChecklists);
});

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

const createActivityChecklist = catchAsync(async (req, res) => {
    const created = maintenancePlanActivityChecklist = await maintenancePlanService.createActivityChecklist(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const deleteActivityChecklist = catchAsync(async (req, res) => {
    await maintenancePlanService.deleteActivityChecklist(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getMaintenancePlans,
    getMaintenancePlansActivitiesChecklists,
    create,
    createActivityChecklist,
    deleteActivityChecklist
}