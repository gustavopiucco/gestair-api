const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const activityModel = require('../models/activity.model');
const scheduleModel = require('../models/schedule.model');
const mysql = require('../database/mysql');

async function generate(maintenancePlanId, startDateString) {
    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    for (let activity of activities) {
        switch (activity.frequency) {
            case 'month':
                await loop(1, startDateString, activity);
                break;
            case '2month':
                await loop(2, startDateString, activity);
                break;
            case '3month':
                await loop(3, startDateString, activity);
                break;
            case '4month':
                await loop(4, startDateString, activity);
                break;
            case '6month':
                await loop(6, startDateString, activity);
                break;
            case 'year':
                await loop(12, startDateString, activity);
                break;
        }
    }
}

async function loop(times, startDateString, activity) {
    let startDate = new Date(startDateString);
    let endDate = new Date(startDateString);
    endDate.setMinutes(endDate.getMinutes() + activity.time);

    const connection = await mysql.getConnection();

    try {
        await connection.beginTransaction();

        for (let i = 1; i <= 12 / times; i++) {
            startDate.setMonth(startDate.getMonth() + times);
            endDate.setMonth(endDate.getMonth() + times);

            if (await scheduleModel.dateRangeExists(connection, startDate, endDate)) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Esta data já está ocupada');
            }

            await scheduleModel.create(connection, startDate, endDate, activity.id);
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
    generate
}