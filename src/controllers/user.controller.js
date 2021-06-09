const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUser = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});

const createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send();
});


const updateUserCompany = catchAsync(async (req, res) => {
    await userService.updateUserCompany(req.params.id, req.body.companyId);
    res.status(httpStatus.OK).send();
});

const updateUserCustomer = catchAsync(async (req, res) => {
    await userService.updateUserCustomer(req.params.id, req.body.customerId);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getUser,
    createUser,
    updateUserCompany,
    updateUserCustomer
}