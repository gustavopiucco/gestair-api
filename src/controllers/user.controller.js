const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getCurrentUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.user.id);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const getUserById = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const getUserByQuery = catchAsync(async (req, res) => {
    const user = await userService.getUserByQuery(req.query);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const getAllUsersByCompanyId = catchAsync(async (req, res) => {
    const users = await userService.getAllUsersByCompanyId(req.user, req.params.companyId);

    users.map((user) => delete user.password_hash);

    res.status(httpStatus.OK).send(users);
});

const createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send();
});

const updateUser = catchAsync(async (req, res) => {
    await userService.updateUser(req.user.id, req.body);
    res.status(httpStatus.OK).send();
});

const setCompanyTechnician = catchAsync(async (req, res) => {
    await userService.setCompanyTechnician(req.params.id, req.body.companyId);
    res.status(httpStatus.OK).send();
});

const setCustomerManager = catchAsync(async (req, res) => {
    await userService.setCustomerManager(req.params.id, req.body.customerId);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getCurrentUser,
    getUserById,
    getUserByQuery,
    getAllUsersByCompanyId,
    createUser,
    updateUser,
    setCompanyTechnician,
    setCustomerManager
}