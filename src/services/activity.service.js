const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const userModel = require('../models/user.model');

async function getAllByMaintenancePlanId(loggedInUser, maintenancePlanId) {
    const maintenancePlan = await maintenancePlanModel.getById(maintenancePlanId);

    if (!maintenancePlan) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não existe');
    }

    if (loggedInUser.companyId != maintenancePlan.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este plano de manutenção não pertence a sua empresa');
    }

    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    activities.map((activity) => {
        delete activity.user_id;
        delete activity.maintenance_plan_id
    });

    return activities;
}

async function create(loggedInUser, body) {
    if (body.userId == loggedInUser.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Você não pode executar essa ação com você mesmo');
    }

    const maintenancePlan = await maintenancePlanModel.getById(body.maintenancePlanId);

    if (!maintenancePlan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Este plano de manutenção não existe');
    }

    if (maintenancePlan.company_id != loggedInUser.companyId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Este plano de manutenção não pertence a sua empresa');
    }

    const user = await userModel.getUserById(body.userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Este usuário não existe');
    }

    if (user.role != 'company_technician') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esté usuário não é um técnico');
    }

    if (user.company_id != loggedInUser.companyId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Este usuário não pertence a sua empresa');
    }

    const created = await activityModel.create(body.name, body.frequency, body.time, body.maintenancePlanId, body.userId);

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