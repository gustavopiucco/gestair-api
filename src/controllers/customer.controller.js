const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const customerService = require('../services/customer.service');

const getAllCustomers = catchAsync(async (req, res) => {
    const customers = await customerService.getAllCustomers(req.user);
    res.status(httpStatus.OK).send(customers);
});

const createCustomer = catchAsync(async (req, res) => {
    await customerService.createCustomer(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    getAllCustomers,
    createCustomer
}