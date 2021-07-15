const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const equipmentModel = require('../models/equipment.model');
const enviromentModel = require('../models/enviroment.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const activityModel = require('../models/activity.model');
const scheduleModel = require('../models/schedule.model');
const dateUtil = require('../utils/date');

async function generate(maintenancePlanId, startDateString) {
    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    for (let activity of activities) {
        let startDate = new Date(startDateString);
        let endDate = new Date(startDateString);

        endDate.setMinutes(endDate.getMinutes() + activity.time);

        switch (activity.frequency) {
            case 'month':
                for (let i = 1; i <= 12; i++) {
                    startDate.setMonth(startDate.getMonth() + 1);
                    endDate.setMonth(endDate.getMonth() + 1);
                    await scheduleModel.create(startDate, endDate, activity.id);
                }
                break;
            case '2month':
                for (let i = 1; i <= 6; i++) {
                    startDate.setMonth(startDate.getMonth() + 2);
                    endDate.setMonth(endDate.getMonth() + 2);
                    await scheduleModel.create(startDate, endDate, activity.id);
                }
                break;
            case '3month':
                for (let i = 1; i <= 4; i++) {
                    startDate.setMonth(startDate.getMonth() + 3);
                    endDate.setMonth(endDate.getMonth() + 3);
                    await scheduleModel.create(startDate, endDate, activity.id);
                }
                break;
            case '4month':
                for (let i = 1; i <= 3; i++) {
                    startDate.setMonth(startDate.getMonth() + 4);
                    endDate.setMonth(endDate.getMonth() + 4);
                    await scheduleModel.create(startDate, endDate, activity.id);
                }
                break;
            case '6month':
                for (let i = 1; i <= 2; i++) {
                    startDate.setMonth(startDate.getMonth() + 6);
                    endDate.setMonth(endDate.getMonth() + 6);
                    await scheduleModel.create(startDate, endDate, activity.id);
                }
                break;
            case 'year':
                startDate.setMonth(startDate.getMonth() + 12);
                endDate.setMonth(endDate.getMonth() + 12);
                await scheduleModel.create(startDate, endDate, activity.id);
                break;
        }
    }
}

module.exports = {
    generate
}