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

async function getUserQuery(query) {
    let user;

    if (query.id) {
        user = await userModel.getUserById(query.id);
    } else if (query.email) {
        user = await userModel.getUserByEmail(query.email);
    } else if (query.cpf) {
        user = await userModel.getUserByCpf(query.cpf);
    }

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    return user;
}

async function createUser(body) {
    if (await userModel.emailExists(body.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este email já está cadastrado');
    }

    if (await userModel.cpfExists(body.cpf)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este CPF já está cadastrado');
    }

    const passwordHash = await bcrypt.hash(body.password, 8);
    await userModel.createUser(body.email, passwordHash, body.firstName, body.lastName, body.cpf, body.phone);
}

async function updateUser(id, role, fields) {
    if (fields.companyId && !rolePermissions.get(role).includes('update_user_company')) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Sem permissão para alterar o ID da empresa');
    }

    if (fields.customerId && !rolePermissions.get(role).includes('update_user_customer')) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Sem permissão para alterar o ID da empresa(cliente)');
    }

    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    if ((fields.companyId && user.customer_id) || (fields.customerId && user.company_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário já pertence a alguma outra empresa ou cliente');
    }

    let company;
    let customer;

    if (fields.companyId) {
        company = await companyModel.getCompanyById(fields.companyId);
    }

    let passwordHash;

    passwordHash = (fields.password) ? await bcrypt.hash(fields.password, 8) : user.password_hash;
    fields.firstName = (fields.firstName) ? fields.firstName : user.first_name;
    fields.lastName = (fields.lastName) ? fields.lastName : user.last_name;
    fields.phone = (fields.phone) ? fields.phone : user.phone;
    fields.companyId = (fields.companyId) ? fields.companyId : user.company_id;
    fields.customerId = (fields.customerId) ? fields.customerId : user.customer_id;

    await userModel.updateUser(id, passwordHash, fields.firstName, fields.lastName, fields.phone, fields.companyId, fields.customerId);
}

module.exports = {
    getUser,
    getUserQuery,
    createUser,
    updateUser
}