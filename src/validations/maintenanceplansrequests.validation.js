const Joi = require('joi');

const getMaintenancePlansRequestsByCompanyId = {
    params:Joi.object().keys({
            companyId: Joi.number().integer().required(),
        }),
    
}
const getMaintenancePlansRequestsByCustomerId = {
    params:Joi.object().keys({
            customerId: Joi.number().integer().required(),
        }),
    
}

const createMaintenancePlanRequest = {
    body: Joi.object().keys({
        requester_cpf: Joi.string().required(),
        requester_firstname: Joi.string().required(),
        requester_lastname: Joi.string().required(),
        description: Joi.string().required(),
        equipment_id: Joi.number().integer().required()
    }),
};

module.exports = {
   createMaintenancePlanRequest,
   getMaintenancePlansRequestsByCompanyId,
   getMaintenancePlansRequestsByCustomerId
};
