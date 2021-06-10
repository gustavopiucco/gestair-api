const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const unitService = require('../services/unit.service');

const createUnit = catchAsync(async (req, res) => {
    await unitService.createUnit(req.body.name, req.body.floors);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    createUnit
}