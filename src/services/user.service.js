const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const companyModel = require('../models/company.model');

async function createUser(body) {
    if (await userModel.emailExists(body.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este email já existe.');
    }

    const passwordHash = await bcrypt.hash(body.password, 8);
    const user = await userModel.createUser(body.email, passwordHash, body.firstName, body.lastName, body.cpf, body.phone);
    return user;
}

async function adminUpdateUser(type, role, email, cnpj) {
    if (!await userModel.emailExists(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este email não existe.');
    }

    if (!await companyModel.getCompanyByCnpj(cnpj)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este CNPJ não existe.');
    }

    const user = await userModel.getUserByEmail(email);
    const company = await companyModel.getCompanyByCnpj(cnpj);
    await userModel.updateUser(user.id, type, role, company.id);
}

module.exports = {
    createUser,
    adminUpdateUser
}