const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const companyModel = require('../models/company.model');
const customerModel = require('../models/customer.model');
const { rolePermissions } = require('../config/roles');

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
    await userModel.createUser(body.email, passwordHash, body.firstName, body.lastName, body.cpf, body.phone);
}

async function updateUser(id, role, password, firstName, lastName, phone, companyId, customerId) {
    if (companyId && !rolePermissions.get(role).includes('update_user_company')) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Sem permissão para alterar o ID da empresa');
    }

    if (customerId && !rolePermissions.get(role).includes('update_user_customer')) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Sem permissão para alterar o ID da empresa(cliente)');
    }

    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    if ((companyId && user.customer_id) || (customerId && user.company_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário já pertence a alguma outra empresa ou cliente');
    }

    let passwordHash;

    passwordHash = (password) ? await bcrypt.hash(password, 8) : user.password_hash;
    firstName = (firstName) ? firstName : user.first_name;
    lastName = (lastName) ? lastName : user.last_name;
    phone = (phone) ? phone : user.phone;
    companyId = (companyId) ? companyId : user.company_id;
    customerId = (customerId) ? customerId : user.customer_id;

    await userModel.updateUser(id, passwordHash, firstName, lastName, phone, companyId, customerId);
}

module.exports = {
    getUser,
    createUser,
    updateUser
}