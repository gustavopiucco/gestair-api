const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const unitService = require('../services/unit.service');

const getAllUnits = catchAsync(async (req, res) => {
    const units = await unitService.getAllUnitsByCustomerId(req.params.customerId);
    res.status(httpStatus.OK).send(units);
});

const create = catchAsync(async (req, res) => {
    await unitService.create(req.body);
    res.status(httpStatus.CREATED).send();
});

const createUnitUserLink = catchAsync(async (req, res) => {
    await unitService.createUnitUserLink(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getAllUnits,
    create,
    createUnitUserLink
}