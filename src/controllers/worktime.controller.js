const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const workTimeService = require('../services/worktime.service');

const createUserWorkTime = catchAsync(async (req, res) => {
    await workTimeService.createUserWorkTime(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    createUserWorkTime
}