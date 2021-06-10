const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const companyModel = require('../models/company.model');
const customerModel = require('../models/customer.model');

async function getUser(id) {
    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    return user;
}

async function createUser(body) {
    if (await userModel.emailExists(body.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este email já existe');
    }

    const passwordHash = await bcrypt.hash(body.password, 8);
    const user = await userModel.createUser(body.email, passwordHash, body.firstName, body.lastName, body.cpf, body.phone);
    return user;
}

async function updateUserCompany(id, companyId) {
    if (!await userModel.exists(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID do usuário não encontrado');
    }

    const company = await companyModel.getCompanyById(companyId);

    if (!company) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID da empresa não encontrado');
    }

    const user = await userModel.getUserById(id);
    await userModel.updateUserCompanyId(user.id, company.id);
}

async function updateUserCustomer(id, customerId) {
    if (!await userModel.exists(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID do usuário não encontrado');
    }

    const customer = await customerModel.getCustomerById(customerId);

    if (!customer) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID da empresa(cliente) não encontrado');
    }

    const user = await userModel.getUserById(id);
    await userModel.updateUserCustomerId(user.id, customer.id);
}

module.exports = {
    getUser,
    createUser,
    updateUserCompany,
    updateUserCustomer
}