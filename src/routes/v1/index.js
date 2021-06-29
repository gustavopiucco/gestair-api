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
const maintenancePlanValidation = require('../../validations/maintenanceplan.validation');

const userController = require('../../controllers/user.controller');
const workTimeController = require('../../controllers/worktime.controller');
const authController = require('../../controllers/auth.controller');
const companyController = require('../../controllers/company.controller');
const customerController = require('../../controllers/customer.controller');
const unitController = require('../../controllers/unit.controller');
const maintenancePlanController = require('../../controllers/maintenanceplan.controller');

//Auth
router.post('/auth/login', validate(authValidation.login), authController.login);

//User
router.get('/users/me', auth(), userController.getCurrentUser);
router.get('/users/query', auth('get_user'), validate(userValidation.getUserByQuery), userController.getUserByQuery);
router.get('/users/all/company', auth('get_all_users_by_company'), validate(userValidation.getAllUsersByCompanyId), userController.getAllUsersByCompanyId);
router.get('/users/:id', auth('get_user'), validate(userValidation.getUserById), userController.getUserById);
router.post('/users', validate(userValidation.createUser), userController.createUser);
router.put('/users/me', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);
router.patch('/users/:id/company', auth('update_user_company'), validate(userValidation.updateCompany), userController.updateUserCompany);
router.patch('/users/:id/customer', auth('update_user_customer'), validate(userValidation.updateCustomer), userController.updateUserCustomer);

//Work Time
router.get('/worktime/query', auth('get_work_time'), validate(workTimeValidation.getWorkTimeQuery), workTimeController.getWorkTimeQuery)
router.get('/worktime/:id', auth('get_work_time'), validate(workTimeValidation.getWorkTimeById), workTimeController.getWorkTimeById);
router.post('/worktime', auth('create_work_time'), validate(workTimeValidation.createWorkTime), workTimeController.createWorkTime);
router.delete('/worktime/:id', auth('delete_work_time'), validate(workTimeValidation.deleteWorkTimeById), workTimeController.deleteWorkTime);

//Maintenance Plan
router.get('/maintenance-plans/all', auth('get_maintenance_plans'), maintenancePlanController.getMaintenancePlans);
router.post('/maintenance-plans', auth('create_maintenance_plan'), validate(maintenancePlanValidation.create), maintenancePlanController.create);

//Company
router.post('/companies', auth('admin_create_company'), validate(companyValidation.createCompany), companyController.createCompany);

//Customer
router.post('/customers', auth('create_customer'), validate(customerValidation.createCustomer), customerController.createCustomer);

//Unit
router.post('/units', auth('create_unit'), validate(unitValidation.createUnit), unitController.createUnit);

module.exports = router;