const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) =>{
    res.status(httpStatus.OK).send();
});

const login = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});

module.exports = {
    register,
    login
}