const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenanceRequestService = require('../services/maintenanceplanrequest.service');

const createMaintenancePlanRequest = catchAsync(async (req, res) => {
    await maintenanceRequestService.createMaintenancePlanRequest(req.body);
    res.status(httpStatus.CREATED).send();
});

const getMaintenancePlansRequestsByCompanyId = catchAsync(async (req, res) => {
    let {companyId} = req.params
    companyId = parseInt(companyId)
    let result =  await maintenanceRequestService.getMaintenancePlansRequestsByCompanyId(companyId)
    res.status(httpStatus.OK).send(result);
});

const getMaintenancePlansRequestsByCustomerId = catchAsync(async (req, res) => {
    let {customerId} = req.params
    customerId = parseInt(customerId)
    let result =  await maintenanceRequestService.getMaintenancePlansRequestsByCustomerId(customerId)
    res.status(httpStatus.OK).send(result);
});



module.exports = {
    createMaintenancePlanRequest,
    getMaintenancePlansRequestsByCompanyId,
    getMaintenancePlansRequestsByCustomerId
}
