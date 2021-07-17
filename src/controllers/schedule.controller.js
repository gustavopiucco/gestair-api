const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const scheduleService = require('../services/schedule.service');

const getByUserId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getByUserId(req.params.userId);
    res.status(httpStatus.OK).send(schedules);
});

const getByCompanyId = catchAsync(async (req, res) => {
    const schedules = await scheduleService.getByCompanyId(req.params.companyId);
    res.status(httpStatus.OK).send(schedules);
});

const create = catchAsync(async (req, res) => {
    await scheduleService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getByUserId,
    getByCompanyId,
    create
}