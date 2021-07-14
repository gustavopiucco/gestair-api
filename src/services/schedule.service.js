const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const equipmentModel = require('../models/equipment.model');
const enviromentModel = require('../models/enviroment.model');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const activityModel = require('../models/activity.model');

async function generate(maintenancePlanId) {
    //ao cadastrar pra periodicidade seguinte, verificar se o técnico tem um work time disponivel no dia q cair, pq as vezes cai num dia que não trabalha, independente do horario

    const activities = await activityModel.getAllByMaintenancePlanId(maintenancePlanId);

    let startDate = new Date();
    let endDate = new Date();
    let activitiesTimeInMinutes = 0;

    for (let activity of activities) {
        activitiesTimeInMinutes += activity.time;
    }

    endDate.setMinutes(endDate.getMinutes() + activitiesTimeInMinutes);

    console.log('Total Atividades:', activitiesTimeInMinutes, 'min');
    console.log('Data inicial    :', startDate);
    console.log('Data final      :', endDate);
}

module.exports = {
    generate
}