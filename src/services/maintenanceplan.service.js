const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getMaintenancePlans(loggedInUser) {
    const maintenancePlans = await maintenancePlanModel.getMaintenancePlansByCompanyId(loggedInUser.companyId);

    return maintenancePlans;
}

async function getMaintenancePlansActivities(loggedInUser, maintenancePlanId) {
    const maintenancePlan = await maintenancePlanModel.getMaintenancePlanById(maintenancePlanId);

    if (!maintenancePlan) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    console.log(maintenancePlan)

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    }

    const maintenancePlansActivities = await maintenancePlanModel.getMaintenancePlansActivitiesByMaintenancePlanId(maintenancePlanId);

    return maintenancePlansActivities;
}

async function create(loggedInUser, body) {
    const maintenancePlan = await maintenancePlanModel.create(body.name, loggedInUser.companyId);

    return maintenancePlan;
}

async function createActivity(loggedInUser, body) {
    if (!await maintenancePlanModel.maintenancePlanExists(body.maintenancePlanId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    const maintenancePlanActivity = await maintenancePlanModel.createActivity(body.name, body.frequency, body.time, body.maintenancePlanId);

    return maintenancePlanActivity;
}

module.exports = {
    getMaintenancePlans,
    getMaintenancePlansActivities,
    create,
    createActivity
}