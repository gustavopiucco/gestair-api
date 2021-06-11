const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUser(req.params.id);
    delete user.password_hash;
    res.status(httpStatus.OK).send(user);
});

const createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send();
});

const updateUser = catchAsync(async (req, res) => {
    await userService.updateUser(req.params.id, req.user.role, req.body.password, req.body.firstName, req.body.lastName, req.body.phone, req.body.companyId, req.body.customerId);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getUser,
    createUser,
    updateUser
}