const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const authValidation = require('../../validations/auth.validation');
const userValidation = require('../../validations/user.validations');
const companyValidation = require('../../validations/company.validation');
const customerValidation = require('../../validations/customer.validation');
const unitValidation = require('../../validations/unit.validation');

const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');
const companyController = require('../../controllers/company.controller');
const customerController = require('../../controllers/customer.controller');
const unitController = require('../../controllers/unit.controller');

//Auth
router.post('/auth/login', validate(authValidation.login), authController.login);

//User
router.get('/user', auth('get_user'), validate(userValidation.getUser), userController.getUser);
//router.get('/user/:id', auth('get_user'), validate(userValidation.getUser), userController.getUser);
router.post('/user', validate(userValidation.createUser), userController.createUser);
router.put('/user', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);
//router.put('/users/:id', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);

//Company
router.post('/company', auth('admin_create_company'), validate(companyValidation.createCompany), companyController.createCompany);

//Customer
router.post('/customer', auth('create_customer'), validate(customerValidation.createCustomer), customerController.createCustomer);

//Unit
router.post('/unit', auth('create_unit'), validate(unitValidation.createUnit), unitController.createUnit);

module.exports = router;