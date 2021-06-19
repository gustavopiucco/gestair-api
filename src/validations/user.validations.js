const Joi = require('joi');
const { password } = require('./custom.validation');

const getUserQuery = {
    query: Joi.object().keys({
        id: Joi.number().integer(),
        email: Joi.string().email(),
        cpf: Joi.string()
    })
};

const updateUser = {
    params: Joi.object().keys({
        id: Joi.number().integer()
    }),
    body: Joi.object().keys({
        password: Joi.string().custom(password),
        firstName: Joi.string(),
        lastName: Joi.string(),
        phone: Joi.string()
    }),
};

const updateCompany = {
    params: Joi.object().keys({
        id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        companyId: Joi.number().integer().required(),
    }),
};

const updateCustomer = {
    params: Joi.object().keys({
        id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        customerId: Joi.number().integer().required(),
    }),
};

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        cpf: Joi.string().required().length(11),
        phone: Joi.string().required(),
    }),
};

module.exports = {
    getUserQuery,
    updateUser,
    updateCompany,
    updateCustomer,
    createUser
};