const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');

const register = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});

const login = catchAsync(async (req, res) => {
    const user = await authService.loginWithEmailAndPassword(req.body.email, req.body.password);
    const accessToken = authService.generateAccessToken(req.body.username);
    res.status(httpStatus.OK).send({
        id: user.id,
        email: user.email,
        accessToken: accessToken
    });
});

module.exports = {
    register,
    login
}