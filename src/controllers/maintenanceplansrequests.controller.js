const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const maintenanceRequestService = require('../services/maintenanceplansrequests.service')

const createMaintenancePlanRequest = catchAsync(async (req, res) => {
    await maintenanceRequestService.createMaintenancePlanRequest(req.body);
    res.status(httpStatus.CREATED).send();
});

const getMaintenancePlansRequestsByCompanyId = catchAsync(async (req, res) => {
    let {companyId} = req.user
    companyId = parseInt(companyId)
    let result =  await maintenanceRequestService.getMaintenancePlansRequestsByCompanyId(companyId)
    res.status(httpStatus.OK).send(result);
});

const getMaintenancePlansRequestsByCustomerId = catchAsync(async (req, res) => {
    let {customerId} = req.user
    customerId = parseInt(customerId)
    let result =  await maintenanceRequestService.getMaintenancePlansRequestsByCustomerId(customerId)
    res.status(httpStatus.OK).send(result);
});


const managerApproveMaintenancePlanRequest = catchAsync(async (req, res) => {
    let {maintenance_plan_request_id} = req.params
    await maintenanceRequestService.managerApproveMaintenancePlanRequest(maintenance_plan_request_id,req.user)
    res.status(httpStatus.OK).send();
});

const customerApproveMaintenancePlanRequest = catchAsync(async (req, res) => {
    let {maintenance_plan_request_id} = req.params
    await maintenanceRequestService.customerApproveMaintenancePlanRequest(maintenance_plan_request_id,req.user)
    res.status(httpStatus.OK).send();
});




module.exports = {
    createMaintenancePlanRequest,
    getMaintenancePlansRequestsByCompanyId,
    getMaintenancePlansRequestsByCustomerId,
    managerApproveMaintenancePlanRequest,
    customerApproveMaintenancePlanRequest
}
