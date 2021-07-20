const Joi = require('joi');



const createMaintenancePlanRequest = {
    body: Joi.object().keys({
        requester_cpf: Joi.string().required(),
        requester_firstname: Joi.string().required(),
        requester_lastname: Joi.string().required(),
        description: Joi.string().required(),
        equipment_id: Joi.number().integer().required()
    }),
};

const managerApproveMaintenancePlanRequest = {
    body:Joi.object().keys({
        maintenance_plan_request_id:Joi.number().integer().required()
    })
}
const customerApproveMaintenancePlanRequest = {
    body:Joi.object().keys({
        maintenance_plan_request_id:Joi.number().integer().required()
    })
}

module.exports = {
   createMaintenancePlanRequest,
   managerApproveMaintenancePlanRequest,
   customerApproveMaintenancePlanRequest
};
