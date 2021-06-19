const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUser(req.user.id);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const getUserQuery = catchAsync(async (req, res) => {
    const user = await userService.getUserQuery(req.query);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send();
});

const updateUser = catchAsync(async (req, res) => {
    await userService.updateUser(req.user.id, req.body);
    res.status(httpStatus.OK).send();
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
    getUserQuery,
    createUser,
    updateUser,
    updateUserCompany,
    updateUserCustomer
}