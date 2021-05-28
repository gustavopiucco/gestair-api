const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body.email, req.body.password);
    res.status(httpStatus.CREATED).send();
});

const getUser = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});

module.exports = {
    createUser,
    getUser
}