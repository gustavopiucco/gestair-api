const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const login = catchAsync(async (req, res) => {
    const user = await authService.loginWithEmailAndPassword(req.body.email, req.body.password);
    const accessToken = tokenService.generateAccessToken(user.id, user.email, user.type, user.role, user.company_id, user.customer_id);

    res.status(httpStatus.OK).send({
        id: user.id,
        email: user.email,
        type: user.type,
        role: user.role,
        companyId: user.company_id,
        customerId: user.customer_id,
        accessToken,
    });
});

module.exports = {
    login
}