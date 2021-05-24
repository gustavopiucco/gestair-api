const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const getUser = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send();
});


module.exports = {
    getUser
}