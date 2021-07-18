const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const activityModel = require('../models/activity.model');
const checklistModel = require('../models/checklist.model');

async function getAllByActivityId(loggedInUser, activityId) {
    const activity = await activityModel.getActivityById(activityId);

    if (!activity) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não existe');
    }

    // if (loggedInUser.companyId != maintenancePlan.company_id) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    // }

    const checklists = await checklistModel.getAllByActivityId(activityId);

    return checklists;
}

async function create(loggedInUser, body) {
    const activity = await activityModel.getById(body.activityId);

    if (!activity) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não existe');
    }

    const maintenancePlan = await maintenancePlanModel.getById(activity.maintenance_plan_id);

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta atividade não pertence a sua empresa');
    }

    body.valueType = (body.valueType) ? body.valueType : null;
    body.minValue = (body.minValue) ? body.minValue : null;
    body.maxValue = (body.maxValue) ? body.maxValue : null;
    body.done = (body.done) ? body.done : false;

    const created = await checklistModel.create(body.name, body.valueType, body.minValue, body.maxValue, body.done, body.activityId);

    return { id: created.insertId };
}

async function remove(id) {
    //TODO: restrições
    await checklistModel.remove(id);
}

module.exports = {
    getAllByActivityId,
    create,
    remove
}