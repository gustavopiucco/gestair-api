const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const scheduleModel = require('../models/schedule.model');
const equipmentModel = require('../models/equipment.model');
const mysql = require('../database/mysql');

async function getByUserId(userId, date) {
    const schedules = await scheduleModel.getByUserId(userId, date);

    return schedules;
}

async function getByCompanyId(companyId, date) {
    const schedules = await scheduleModel.getByCompanyId(companyId, date);

    return schedules;
}

async function setUserId(userId) {
    //verificar se o userId existe
    //verificar se o userId é técnico
    //verificar se o userId já foi setado

    await scheduleModel.setUserId(userId);
}

async function generate(equipmentId, maintenancePlanId, startDateString) {
    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    const connection = await mysql.pool.getConnection();

    try {
        await connection.beginTransaction();

        for (let activity of activities) {
            switch (activity.frequency) {
                case 'month':
                    await generateSchedules(1, startDateString, activity, connection);
                    break;
                case '2month':
                    await generateSchedules(2, startDateString, activity, connection);
                    break;
                case '3month':
                    await generateSchedules(3, startDateString, activity, connection);
                    break;
                case '4month':
                    await generateSchedules(4, startDateString, activity, connection);
                    break;
                case '6month':
                    await generateSchedules(6, startDateString, activity, connection);
                    break;
                case 'year':
                    await generateSchedules(12, startDateString, activity, connection);
                    break;
            }
        }

        await equipmentModel.setMaintenancePlan(equipmentId, maintenancePlanId, connection);

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

async function generateSchedules(times, startDateString, activity, connection) {
    let startDate = new Date(startDateString);
    let endDate = new Date(startDateString);
    endDate.setMinutes(endDate.getMinutes() + activity.time);

    for (let i = 1; i <= 12 / times; i++) {
        startDate.setMonth(startDate.getMonth() + times);
        endDate.setMonth(endDate.getMonth() + times);

        if (await scheduleModel.dateRangeExists(startDate, endDate, connection)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Alguma data na criação da agenda já está ocupada');
        }

        await scheduleModel.create(startDate, endDate, activity.id, connection);
    }
}

module.exports = {
    getByUserId,
    getByCompanyId,
    setUserId,
    generate,
}