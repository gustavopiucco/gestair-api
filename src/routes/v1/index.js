const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const authValidation = require('../../validations/auth.validation');
const userValidation = require('../../validations/user.validations');
const workTimeValidation = require('../../validations/worktime.validations');
const companyValidation = require('../../validations/company.validation');
const customerValidation = require('../../validations/customer.validation');
const unitValidation = require('../../validations/unit.validation');

const userController = require('../../controllers/user.controller');
const workTimeController = require('../../controllers/worktime.controller');
const authController = require('../../controllers/auth.controller');
const companyController = require('../../controllers/company.controller');
const customerController = require('../../controllers/customer.controller');
const unitController = require('../../controllers/unit.controller');

//Auth
router.post('/auth/login', validate(authValidation.login), authController.login);

//User
router.get('/user', auth(), userController.getUser);
router.get('/user/query', auth('get_user'), validate(userValidation.getUserQuery), userController.getUserQuery);
router.post('/user', validate(userValidation.createUser), userController.createUser);
router.put('/user', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);
router.patch('/user/:id/company', auth('update_user_company'), validate(userValidation.updateCompany), userController.updateUserCompany);
router.patch('/user/:id/customer', auth('update_user_customer'), validate(userValidation.updateCustomer), userController.updateUserCustomer);

//Work Time
router.get('/worktime/query', auth('get_work_time'), validate(workTimeValidation.getWorkTimeQuery), workTimeController.getWorkTimeQuery)
router.get('/worktime/:id', auth('get_work_time'), validate(workTimeValidation.getWorkTimeById), workTimeController.getWorkTimeById);
router.post('/worktime', auth('create_work_time'), validate(workTimeValidation.createWorkTime), workTimeController.createWorkTime);

//Company
router.post('/company', auth('admin_create_company'), validate(companyValidation.createCompany), companyController.createCompany);

//Customer
router.post('/customer', auth('create_customer'), validate(customerValidation.createCustomer), customerController.createCustomer);

//Unit
router.post('/unit', auth('create_unit'), validate(unitValidation.createUnit), unitController.createUnit);

module.exports = router;