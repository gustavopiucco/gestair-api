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

        for (let activity of activities) {
            switch (activity.frequency) {
                case 'month':
                    await generate(1, body.startDate, activity, connection);
                    break;
                case '2month':
                    await generate(2, body.startDate, activity, connection);
                    break;
                case '3month':
                    await generate(3, body.startDate, activity, connection);
                    break;
                case '4month':
                    await generate(4, body.startDate, activity, connection);
                    break;
                case '6month':
                    await generate(6, body.startDate, activity, connection);
                    break;
                case 'year':
                    await generate(12, body.startDate, activity, connection);
                    break;
            }
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

async function generate(times, startDateString, activity, connection) {
    let startDate = new Date(startDateString);
    let endDate = new Date(startDateString);
    endDate.setMinutes(endDate.getMinutes() + activity.time);

    for (let i = 1; i <= 12 / times; i++) {
        startDate.setMonth(startDate.getMonth() + times);
        endDate.setMonth(endDate.getMonth() + times);

        //if (await scheduleModel.dateRangeExists(startDate, endDate, connection)) {
        //throw new ApiError(httpStatus.BAD_REQUEST, 'Alguma data na criação da agenda já está ocupada');
        //}

        await scheduleModel.create(startDate, endDate, activity.id, connection);
    }
}

module.exports = {
    getByUserId,
    getByCompanyId,
    setUserId,
    create,
    generate,
}