const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const scheduleService = require('../services/schedule.service');

const create = catchAsync(async (req, res) => {
    await scheduleService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    create
}