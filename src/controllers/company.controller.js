const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
//const userService = require('../services/user.service');

const createCompany = catchAsync(async (req, res) => {
    //await userService.createUser(req.body.email, req.body.password);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    createCompany
}