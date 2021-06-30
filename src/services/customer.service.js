const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const customerModel = require('../models/customer.model');

async function getAllCustomers(loggedInUser) {
    const customers = await customerModel.getAllCustomersByCompanyId(loggedInUser.companyId);

    return customers;
}

async function createCustomer(loggedInUser, body) {
    if (await customerModel.cnpjExists(body.cnpj)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este CNPJ já está cadastrado.');
    }

    const company = await customerModel.createCustomer(body.companyName, body.tradingName, body.cnpj, loggedInUser.companyId);
    return company;
}

module.exports = {
    getAllCustomers,
    createCustomer
}