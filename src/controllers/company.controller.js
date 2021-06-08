const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const companyService = require('../services/company.service');

const createCompany = catchAsync(async (req, res) => {
    await companyService.createCompany(req.body);
    res.status(httpStatus.CREATED).send();
});

module.exports = {
    createCompany
}