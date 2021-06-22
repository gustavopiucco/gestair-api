const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const workTimeService = require('../services/worktime.service');

const getWorkTimeById = catchAsync(async (req, res) => {
    const workTime = await workTimeService.getWorkTimeById(req.params.id);
    res.status(httpStatus.OK).send(workTime);
});

const getWorkTimeQuery = catchAsync(async (req, res) => {
    const workTime = await workTimeService.getWorkTimeQuery(req.query);
    res.status(httpStatus.OK).send(workTime);
});

const createWorkTime = catchAsync(async (req, res) => {
    await workTimeService.createWorkTime(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getWorkTimeById,
    getWorkTimeQuery,
    createWorkTime
}