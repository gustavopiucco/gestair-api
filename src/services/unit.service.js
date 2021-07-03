const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const unitModel = require('../models/unit.model');
const customerModel = require('../models/customer.model');
const userModel = require('../models/user.model');

async function getAllUnitsByCustomerId(customerId) {
    const units = await unitModel.getAllUnitsByCustomerId(customerId);

    return units;
}

async function createUnit(body) {
    if (!await customerModel.exists(body.customerId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa/cliente não existe');
    }

    await unitModel.createUnit(body.name, body.floors, body.address, body.district, body.city, body.federalUnit, body.cep, body.customerId);
}

async function createTechnicianUnitLink(loggedInUser, body) {
    if (await unitModel.unitTechnicianExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta unidade já está vinculada a este técnico');
    }

    if (loggedInUser.companyId != await unitModel.getCompanyIdByUnitsTechniciansUnitId(body.unitId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Está unidade não pertence a sua empresa');
    }

    const technicianUser = await userModel.getUserById(body.technicianUserId);

    if (loggedInUser.companyId != technicianUser.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este técnico não pertence a sua empresa');
    }

    await unitModel.createUnitTechnician(body.unitId, body.technicianUserId);
}

module.exports = {
    getAllUnitsByCustomerId,
    createUnit,
    createTechnicianUnitLink
}