const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const tokenService = require('../services/token.service');

const register = catchAsync(async (req, res) => {
    const token = tokenService.generateAccessToken({ username: req.body.username });

    res.status(httpStatus.OK).send({ token });
});

const login = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});

module.exports = {
    register,
    login
}