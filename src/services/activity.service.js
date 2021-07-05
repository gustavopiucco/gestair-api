const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getMaintenancePlansActivities(loggedInUser, maintenancePlanId) {
    const maintenancePlan = await maintenancePlanModel.getMaintenancePlanById(maintenancePlanId);

    if (!maintenancePlan) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    }

    const maintenancePlansActivities = await activityModel.getMaintenancePlansActivitiesByMaintenancePlanId(maintenancePlanId);

    return maintenancePlansActivities;
}

async function createActivity(loggedInUser, body) {
    if (!await activityModel.maintenancePlanActivityExists(body.maintenancePlanId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    const created = await activityModel.createActivity(body.name, body.frequency, body.time, body.maintenancePlanId);

    return { id: created.insertId };
}

async function deleteActivity(id) {
    //TODO: restrições
    await activityModel.deleteActivity(id);
}

module.exports = {
    getMaintenancePlansActivities,
    createActivity,
    deleteActivity
}