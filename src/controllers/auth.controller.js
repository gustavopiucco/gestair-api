const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');

const login = catchAsync(async (req, res) => {
    const user = await authService.loginWithEmailAndPassword(req.body.email, req.body.password);
    const accessToken = authService.generateAccessToken(user.email, user.type, user.role);
    res.status(httpStatus.OK).send({
        id: user.id,
        email: user.email,
        type: user.type,
        role: user.role,
        accessToken
    });
});

module.exports = {
    login
}