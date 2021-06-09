const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const customerModel = require('../models/customer.model');

async function createCustomer(body) {
    if (await customerModel.cnpjExists(body.cnpj)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este CNPJ já está cadastrado.');
    }

    const company = await customerModel.createCustomer(body.companyName, body.tradingName, body.cnpj, body.companyId);
    return company;
}

module.exports = {
    createCustomer
}