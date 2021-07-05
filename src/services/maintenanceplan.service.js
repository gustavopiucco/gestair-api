const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getAll(loggedInUser) {
    const maintenancePlans = await maintenancePlanModel.getAllByCompanyId(loggedInUser.companyId);

    return maintenancePlans;
}

async function create(loggedInUser, body) {
    const maintenancePlan = await maintenancePlanModel.create(body.name, loggedInUser.companyId);

    return maintenancePlan;
}

module.exports = {
    getAll,
    create
}