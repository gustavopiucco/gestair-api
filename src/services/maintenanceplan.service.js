const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getMaintenancePlans(loggedInUser) {
    const maintenancePlans = await maintenancePlanModel.getMaintenancePlansByCompanyId(loggedInUser.companyId);

    return maintenancePlans;
}

async function create(loggedInUser, body) {
    const maintenancePlan = await maintenancePlanModel.create(body.name, body.startDate, body.endDate, loggedInUser.companyId);

    return maintenancePlan;
}

module.exports = {
    getMaintenancePlans,
    create
}