const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const responseService = require('../services/response.service');

const create = catchAsync(async (req, res) => {
    await responseService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    create
}