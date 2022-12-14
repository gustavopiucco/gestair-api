const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const scheduleService = require('../services/schedule.service');

const getByUserId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getByUserId(req.params.userId, req.query.date);
    res.status(httpStatus.OK).send(schedules);
});

const getAllByCustomerId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getAllByCustomerId(req.params.customerId, req.query.date);
    res.status(httpStatus.OK).send(schedules);
});

const getAllByCompanyId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getAllByCompanyId(req.params.companyId, req.query.date);
    res.status(httpStatus.OK).send(schedules);
});

const getAllByMaintenancePlanId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getAllByMaintenancePlanId(req.params.maintenancePlanId);
    res.status(httpStatus.OK).send(schedules);
});

const setUserId = catchAsync(async (req, res) => {
    await scheduleService.setUserId(req.params.scheduleId, req.body.userId);
    res.status(httpStatus.OK).send();
});

const create = catchAsync(async (req, res) => {
    await scheduleService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

const createSingle = catchAsync(async (req, res) => {
    await scheduleService.createSingle(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getByUserId,
    getAllByCustomerId,
    getAllByCompanyId,
    getAllByMaintenancePlanId,
    setUserId,
    create,
    createSingle
}