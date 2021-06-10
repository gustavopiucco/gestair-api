const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const unitModel = require('../models/unit.model');

async function createUnit(name, floors) {
    const unit = await unitModel.createUnit(name, floors)
    return unit;
}

module.exports = {
    createUnit
}