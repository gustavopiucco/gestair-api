const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const customerService = require('../services/customer.service');

const createCustomer = catchAsync(async (req, res) => {
    await customerService.createCustomer(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    createCustomer
}