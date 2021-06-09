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


const adminUpdateUser = catchAsync(async (req, res) => {
    await userService.adminUpdateUser(req.body.type, req.body.role, req.body.email, req.body.cnpj);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getUser,
    createUser,
    adminUpdateUser
}