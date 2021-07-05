const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getAllByMaintenancePlanId(loggedInUser, maintenancePlanId) {
    const maintenancePlan = await maintenancePlanModel.getMaintenancePlanById(maintenancePlanId);

    if (!maintenancePlan) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    }

    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    return activities;
}

async function create(loggedInUser, body) {
    if (!await activityModel.exists(body.maintenancePlanId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    const created = await activityModel.create(body.name, body.frequency, body.time, body.maintenancePlanId);

    return { id: created.insertId };
}

async function remove(id) {
    //TODO: restrições
    await activityModel.remove(id);
}

module.exports = {
    getAllByMaintenancePlanId,
    create,
    remove
}