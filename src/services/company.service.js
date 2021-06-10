const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const companyModel = require('../models/company.model');

async function createCompany(body) {
    if (await companyModel.cnpjExists(body.cnpj)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este CNPJ já está cadastrado.');
    }

    const company = await companyModel.createCompany(body.companyName, body.tradingName, body.cnpj);
    return company;
}

module.exports = {
    createCompany
}