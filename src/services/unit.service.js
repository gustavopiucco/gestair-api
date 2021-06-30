const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const unitModel = require('../models/unit.model');
const customerModel = require('../models/customer.model');

async function getAllUnitsByCustomerId(customerId) {
    const units = await unitModel.getAllUnitsByCustomerId(customerId);

    return units;
}

async function createUnit(body) {
    if (!await customerModel.exists(body.customerId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa/cliente não existe');
    }

    const unit = await unitModel.createUnit(body.name, body.floors, body.address, body.district, body.city, body.federalUnit, body.cep, body.customerId);

    return unit;
}

module.exports = {
    getAllUnitsByCustomerId,
    createUnit
}