const Joi = require('joi');

const createCompany = {
    body: Joi.object().keys({
        companyName: Joi.string().required(),
        tradingName: Joi.string().required(),
        cnpj: Joi.string().required(),
    }),
};

module.exports = {
    createCompany
};