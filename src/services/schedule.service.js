const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const scheduleModel = require('../models/schedule.model');
const userModel = require('../models/user.model');
const mysql = require('../database/mysql');

async function getByUserId(userId, date) {
    const schedules = await scheduleModel.getByUserId(userId, date);

    return schedules;
}

async function getByCompanyId(companyId, date) {
    const schedules = await scheduleModel.getByCompanyId(companyId, date);

    return schedules;
}

async function setUserId(scheduleId, userId) {
    if (!await scheduleModel.exists(scheduleId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Está agenda não existe');
    }

    const user = await userModel.getUserById(userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Está usuário não existe');
    }

    if (user.role != 'company_technician') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário não é técnico');
    }

    if (await scheduleModel.userIdExists(scheduleId, userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Já existe um técnico vinculado a este agendamento');
    }

    await scheduleModel.setUserId(scheduleId, userId);
}

async function create(body) {
    const activities = await activityModel.getAllByMaintenancePlanId(body.maintenancePlanId);

    const connection = await mysql.pool.getConnection();

    try {
        await connection.beginTransaction();

        let startDate = new Date(body.startDate);
        let endDate = new Date(body.startDate);

        const monthsToAdd = {
            'month': 1,
            '2month': 2,
            '3month': 3,
            '4month': 4,
            '6month': 6,
            'year': 12
        };

        for (let activity of activities) {
            endDate.setMinutes(endDate.getMinutes() + activity.time);

            for (let i = 1; i <= 12 / monthsToAdd[activity.frequency]; i++) {
                startDate.setMonth(startDate.getMonth() + monthsToAdd[activity.frequency]);
                endDate.setMonth(endDate.getMonth() + monthsToAdd[activity.frequency]);

                if (await scheduleModel.dateRangeExists(startDate, endDate, connection)) {
                    throw new ApiError(httpStatus.BAD_REQUEST, 'Alguma data na criação da agenda já está ocupada');
                }

                await scheduleModel.create(startDate, endDate, activity.id, connection);
            }

            startDate.setMinutes(startDate.getMinutes() + activity.time);
        }

        await connection.commit();

    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        await connection.release();
    }
}

module.exports = {
    getByUserId,
    getByCompanyId,
    setUserId,
    create
}