const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const unitModel = require('../models/unit.model');
const customerModel = require('../models/customer.model');
const userModel = require('../models/user.model');

async function getAllUnitsByCustomerId(customerId) {
    const units = await unitModel.getAllUnitsByCustomerId(customerId);

    return units;
}

async function create(body) {
    if (!await customerModel.exists(body.customerId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa/cliente não existe');
    }

    await unitModel.create(body.name, body.floors, body.address, body.district, body.city, body.federalUnit, body.cep, body.customerId);
}

async function createUnitUserLink(loggedInUser, body) {
    if (await unitModel.unitUserExists(body.unitId, body.userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Está unidade já está vinculada a esté usuário');
    }

    //verificar se está unitId -> customerId -> companyId pertence ao loggedInUser.companyId

    //verificar se este userId pertence a loggedInUser.companyId

    await unitModel.createUnitUserLink(body.unitId, body.userId)
}

module.exports = {
    getAllUnitsByCustomerId,
    create,
    createUnitUserLink
}