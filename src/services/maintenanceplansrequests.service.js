const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenanceRequestModel = require('../models/maintenanceplansrequests.model')
const customerModel = require('../models/customer.model');
const companyModel = require('../models/company.model')
const equipmentModel = require('../models/equipment.model')

async function createMaintenancePlanRequest(body) {
   

    const maintenanceRequest = await maintenanceRequestModel.createMaintenancePlanRequest(body.requester_cpf,body.requester_firstname,body.requester_lastname,body.description,body.equipment_id);
    return maintenanceRequest;
}


async function getMaintenancePlansRequestsByCompanyId(company_id){
     
    if (!await companyModel.exists(company_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa/cliente não existe');
    }
     let result = await maintenanceRequestModel.getMaintenancePlansRequestsByCompanyId(company_id);
     return result;
}

async function getMaintenancePlansRequestsByCustomerId(customer_id){
    if (!await customerModel.exists(customer_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Esta empresa/cliente não existe');
    }
    let result = await maintenanceRequestModel.getMaintenancePlansRequestsByCustomerId(customer_id);
    return result;
}

async function customerApproveMaintenancePlanRequest(maintenance_plan_request_id,loggedInUser){
    
    if(!loggedInUser || !loggedInUser.customerId){   
        throw new ApiError(httpStatus.BAD_REQUEST, '');
    }

    if(loggedInUser.role !== 'customer_manager'){
        throw new ApiError(httpStatus.FORBIDDEN, 'Você não tem permissão para realizar a ação');
    }


    
    // Checar se a solicitação pertence ou não ao customer 
    const maintenancePlanRequest = await maintenanceRequestModel.getById(maintenance_plan_request_id)
    if(!maintenancePlanRequest){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de solicitação não existe');
    }

    if(loggedInUser.customerId !== equipmentModel.getCustomerId(maintenancePlanRequest.equipment_id)){
        throw new ApiError(httpStatus.NOT_FOUND, 'Este equipamento não pertence a sua empresa');
    }

    
    const currentTimestamp = new Date()
    await maintenanceRequestModel.customerApproveMaintenancePlanRequest(maintenance_plan_request_id,currentTimestamp)
    return;

}

async function managerApproveMaintenancePlanRequest(maintenance_plan_request_id,loggedInUser){
    if(!loggedInUser || !loggedInUser.companyId){   
        throw new ApiError(httpStatus.BAD_REQUEST, '');
    }

    if(loggedInUser.role !== 'company_manager'){
        throw new ApiError(httpStatus.FORBIDDEN, 'Você não tem permissão para realizar a ação');
    }

    const maintenancePlanRequest = await maintenanceRequestModel.getById(maintenance_plan_request_id)
    if(!maintenancePlanRequest){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de solicitação não existe');
    }

    if(loggedInUser.companyId !== equipmentModel.getCompanyId(maintenancePlanRequest.equipment_id)){
        throw new ApiError(httpStatus.NOT_FOUND, 'Este equipamento não pertence a sua empresa');
    }

    const currentTimestamp = new Date()
    await maintenanceRequestModel.customerApproveMaintenancePlanRequest(maintenance_plan_request_id,currentTimestamp)
    return;








}





module.exports = {
   createMaintenancePlanRequest,
   getMaintenancePlansRequestsByCompanyId,
   getMaintenancePlansRequestsByCustomerId,
   customerApproveMaintenancePlanRequest,
   managerApproveMaintenancePlanRequest
}