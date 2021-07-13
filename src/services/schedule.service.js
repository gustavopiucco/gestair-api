const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const equipmentModel = require('../models/equipment.model');
const enviromentModel = require('../models/enviroment.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const activityModel = require('../models/activity.model');

async function create(body) {
    const activities = await activityModel.getAllByMaintenancePlanId(body.maintenancePlanId);

    let startDate = new Date(body.startDate);
    let endDate = new Date(body.startDate);
    let activitiesTimeInMinutes = 0;

    for (let activity of activities) {
        activitiesTimeInMinutes += activity.time;
    }

    endDate.setMinutes(endDate.getMinutes() + activitiesTimeInMinutes);

    console.log(startDate, endDate)
}

module.exports = {
    create
}