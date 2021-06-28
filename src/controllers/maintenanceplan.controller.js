const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenancePlanService = require('../services/maintenanceplan.service');

const create = catchAsync(async (req, res) => {
    await maintenancePlanService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    create
}