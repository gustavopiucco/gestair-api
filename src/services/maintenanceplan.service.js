const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function create(body) {
    const maintenancePlan = await maintenancePlanModel.create(body.name, body.startDate, body.endDate);

    return maintenancePlan;
}

module.exports = {
    create
}