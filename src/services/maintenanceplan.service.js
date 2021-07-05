const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');

async function getMaintenancePlans(loggedInUser) {
    const maintenancePlans = await maintenancePlanModel.getMaintenancePlansByCompanyId(loggedInUser.companyId);

    return maintenancePlans;
}

async function getMaintenancePlansActivitiesChecklists(loggedInUser, maintenancePlanActivityId) {
    const maintenancePlanActivity = await maintenancePlanModel.getMaintenancePlanActivityById(maintenancePlanActivityId);

    if (!maintenancePlanActivity) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não existe');
    }

    // if (loggedInUser.companyId != maintenancePlan.company_id) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    // }

    const maintenancePlansActivitiesChecklists = await maintenancePlanModel.getMaintenancePlansActivitiesChecklistsByMaintenancePlanActivityId(maintenancePlanActivityId);

    return maintenancePlansActivitiesChecklists;
}

async function create(loggedInUser, body) {
    const maintenancePlan = await maintenancePlanModel.create(body.name, loggedInUser.companyId);

    return maintenancePlan;
}

async function createActivityChecklist(loggedInUser, body) {
    const maintenancePlanActivity = await maintenancePlanModel.getMaintenancePlanActivityById(body.maintenancePlanActivityId);

    if (!maintenancePlanActivity) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não existe');
    }

    const maintenancePlan = await maintenancePlanModel.getMaintenancePlanById(maintenancePlanActivity.maintenance_plan_id);

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não pertence a sua empresa');
    }

    body.valueType = (body.valueType) ? body.valueType : null;
    body.minValue = (body.minValue) ? body.minValue : null;
    body.maxValue = (body.maxValue) ? body.maxValue : null;
    body.done = (body.done) ? body.done : false;

    const created = await maintenancePlanModel.createActivityChecklist(body.name, body.valueType, body.minValue, body.maxValue, body.done, body.maintenancePlanActivityId);

    return { id: created.insertId };
}

async function deleteActivityChecklist(id) {
    //TODO: restrições
    await maintenancePlanModel.deleteActivityChecklist(id);
}

module.exports = {
    getMaintenancePlans,
    getMaintenancePlansActivitiesChecklists,
    create,
    createActivityChecklist,
    deleteActivityChecklist
}