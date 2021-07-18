const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        value_type: Joi.string().required(),
        value: Joi.number().required(),
        checklist_id: Joi.number().integer().required(),
    }),
};

module.exports = {
    create
};