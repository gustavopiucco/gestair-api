const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const companyModel = require('../models/company.model');
const customerModel = require('../models/customer.model');

async function getUserById(id) {
    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    return user;
}

async function getUserByQuery(query) {
    let user;

    if (query.email) {
        user = await userModel.getUserByEmail(query.email);
    } else if (query.cpf) {
        user = await userModel.getUserByCpf(query.cpf);
    }

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário não existe');
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

async function updateUser(id, fields) {
    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de usuário não existe');
    }

    if ((fields.companyId && user.customer_id) || (fields.customerId && user.company_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário já pertence a alguma outra empresa ou cliente');
    }

    let passwordHash;

    passwordHash = (fields.password) ? await bcrypt.hash(fields.password, 8) : user.password_hash;
    fields.firstName = (fields.firstName) ? fields.firstName : user.first_name;
    fields.lastName = (fields.lastName) ? fields.lastName : user.last_name;
    fields.phone = (fields.phone) ? fields.phone : user.phone;

    await userModel.updateUser(id, passwordHash, fields.firstName, fields.lastName, fields.phone);
}

async function updateUserCompany(id, companyId) {
    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário não existe');
    }

    if (user.company_id || user.customer_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário já está vinculado a uma empresa');
    }

    const company = await companyModel.getCompanyById(companyId);

    if (!company) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa não existe');
    }

    await userModel.updateUserCompanyId(id, companyId);
}

async function updateUserCustomer(id, customerId) {
    const user = await userModel.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário não existe');
    }

    if (user.company_id || user.customer_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário já está vinculado a uma empresa');
    }

    const customer = await customerModel.getCustomerById(customerId);

    if (!customer) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa não existe');
    }

    await userModel.updateUserCustomerId(id, customerId);
}

module.exports = {
    getUserById,
    getUserByQuery,
    createUser,
    updateUser,
    updateUserCompany,
    updateUserCustomer
}