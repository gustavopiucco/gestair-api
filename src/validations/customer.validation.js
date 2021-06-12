const Joi = require('joi');

const createCustomer = {
    body: Joi.object().keys({
        companyName: Joi.string().required(),
        tradingName: Joi.string().required(),
        cnpj: Joi.string().required(),
        companyId: Joi.number().integer().required()
    }),
};

module.exports = {
    createCustomer
};