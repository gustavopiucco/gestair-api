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
const enviromentValidation = require('../../validations/enviroment.validation');
const equipmentValidation = require('../../validations/equipment.validation');
const activityValidation = require('../../validations/activity.validation');
const checklistValidation = require('../../validations/checklist.validation');
const scheduleValidation = require('../../validations/schedule.validation');
const responseValidation = require('../../validations/response.validation');
const maintenancePlanRequestValidation = require('../../validations/maintenanceplansrequests.validation')

const userController = require('../../controllers/user.controller');
const workTimeController = require('../../controllers/worktime.controller');
const authController = require('../../controllers/auth.controller');
const companyController = require('../../controllers/company.controller');
const customerController = require('../../controllers/customer.controller');
const unitController = require('../../controllers/unit.controller');
const maintenancePlanController = require('../../controllers/maintenanceplan.controller');
const enviromentController = require('../../controllers/enviroment.controller');
const equipmentController = require('../../controllers/equipment.controller');
const activityController = require('../../controllers/activity.controller');
const checklistController = require('../../controllers/checklist.controller');
const scheduleController = require('../../controllers/schedule.controller');
const responseController = require('../../controllers/response.controller');
const maintenancePlanRequestController = require('../../controllers/maintenanceplansrequests.controller')

//Auth
router.post('/auth/login', validate(authValidation.login), authController.login);

//User
router.get('/users/me', auth(), userController.getCurrentUser);
router.get('/users/query', auth('get_user'), validate(userValidation.getUserByQuery), userController.getUserByQuery);
router.get('/users/all/company', auth('get_all_users_by_company'), validate(userValidation.getAllUsersByCompanyId), userController.getAllUsersByCompanyId);
router.get('/users/:id', auth('get_user'), validate(userValidation.getUserById), userController.getUserById);
router.post('/users', validate(userValidation.createUser), userController.createUser);
router.put('/users/me', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);
router.patch('/users/:id/roles/company-technician', auth('set_company_technician'), validate(userValidation.setCompanyTechnician), userController.setCompanyTechnician);
router.patch('/users/:id/roles/customer-manager', auth('set_customer_manager'), validate(userValidation.setCustomerManager), userController.setCustomerManager);

//Work Time
router.get('/worktime/query', auth('get_work_time'), validate(workTimeValidation.getWorkTimeQuery), workTimeController.getWorkTimeQuery)
router.get('/worktime/:id', auth('get_work_time'), validate(workTimeValidation.getWorkTimeById), workTimeController.getWorkTimeById);
router.post('/worktime', auth('create_work_time'), validate(workTimeValidation.createWorkTime), workTimeController.createWorkTime);
router.delete('/worktime/:id', auth('delete_work_time'), validate(workTimeValidation.deleteWorkTimeById), workTimeController.deleteWorkTime);

//Maintenance Plan
router.get('/maintenance-plans/all', auth('get_maintenance_plans'), maintenancePlanController.getAll);
router.post('/maintenance-plans', auth('create_maintenance_plan'), validate(maintenancePlanValidation.create), maintenancePlanController.create);

//Activity
router.get('/activities/maintenance-plan/:maintenancePlanId', auth('get_activities'), validate(activityValidation.getAllByMaintenancePlanId), activityController.getAllByMaintenancePlanId);
router.post('/activities', auth('create_activity'), validate(activityValidation.createActivity), activityController.create);
router.delete('/activities/:id', auth('delete_activity'), validate(activityValidation.deleteActivityById), activityController.remove);

//Checklist
router.get('/checklists/activity/:activityId', auth('get_checklists'), validate(checklistValidation.getAllByActivityId), checklistController.getAllByActivityId);
router.post('/checklists', auth('create_checklist'), validate(checklistValidation.create), checklistController.create);
router.delete('/checklists/:id', auth('delete_checklist'), validate(checklistValidation.remove), checklistController.remove);

//Responses
router.post('/responses', auth('create_response'), validate(responseValidation.create), responseController.create);

//Company
router.post('/companies', auth('admin_create_company'), validate(companyValidation.createCompany), companyController.createCompany);

//Customer
router.get('/customers/all', auth('get_all_customers'), customerController.getAllCustomers);
router.post('/customers', auth('create_customer'), validate(customerValidation.createCustomer), customerController.createCustomer);

//Unit
router.get('/units/all/customer/:customerId', auth('get_all_units'), validate(unitValidation.getAllUnitsByCustomerId), unitController.getAllUnits);
router.post('/units', auth('create_unit'), validate(unitValidation.create), unitController.create);
router.post('/units/user-link', auth('create_unit_user_link'), validate(unitValidation.createUnitUserLink), unitController.createUnitUserLink);

//Enviroments
router.get('/enviroments/all/unit/:unitId', auth('get_all_enviroments'), validate(enviromentValidation.getAllEnviromentsByUnitId), enviromentController.getAllEnviroments);
router.post('/enviroments', auth('create_enviroment'), validate(enviromentValidation.createEnviroment), enviromentController.create);

//Equipments
router.get('/equipments/system-types/all', auth('get_all_equipments'), equipmentController.getAllSystemTypes);
router.get('/equipments/equipment-types/all', auth('get_all_equipments'), equipmentController.getAllEquipmentTypes);
router.get('/equipments/capacity-types/all', auth('get_all_equipments'), equipmentController.getAllCapacityTypes);
router.get('/equipments/brand-models/all', auth('get_all_equipments'), equipmentController.getAllBrandModels);
router.get('/equipments/enviroment/:enviromentId', auth('get_all_equipments'), validate(equipmentValidation.getAllEquipmentsByEnviromentId), equipmentController.getAllEquipments);
router.post('/equipments', auth('create_equipment'), validate(equipmentValidation.create), equipmentController.create);

//Schedules
router.get('/schedules/all/user/:userId', auth('get_schedules'), validate(scheduleValidation.getByUserId), scheduleController.getByUserId);
router.get('/schedules/all/customer/:customerId', auth('get_schedules'), validate(scheduleValidation.getAllByCustomerId), scheduleController.getAllByCustomerId);
router.get('/schedules/all/company/:companyId', auth('get_schedules'), validate(scheduleValidation.getAllByCompanyId), scheduleController.getAllByCompanyId);
router.get('/schedules/all/maintenance-plan/:maintenancePlanId', auth('get_schedules'), validate(scheduleValidation.getAllByMaintenancePlanId), scheduleController.getAllByMaintenancePlanId);
router.post('/schedules', auth('create_schedule'), auth('create_schedule'), validate(scheduleValidation.create), scheduleController.create);
router.post('/schedules/single', auth('create_schedule'), auth('create_schedule'), validate(scheduleValidation.createSingle), scheduleController.createSingle);
router.patch('/schedules/:scheduleId/user', auth('create_schedule'), validate(scheduleValidation.setUserId), scheduleController.setUserId);


// Maintenance plans requests
router.post('/maintenance-plans-requests/', validate(maintenancePlanRequestValidation.createMaintenancePlanRequest), maintenancePlanRequestController.createMaintenancePlanRequest)
router.get('/maintenance-plans-requests/all/company', auth('get_company_maintenance_plans_requests'), maintenancePlanRequestController.getMaintenancePlansRequestsByCompanyId)
router.get('/maintenance-plans-requests/all/customer', auth('get_customer__maintenance_plans_requests'), maintenancePlanRequestController.getMaintenancePlansRequestsByCustomerId)
router.patch('/maintenance-plans-requests/company/approve', auth('manager_approve_maintenance_plan_request'), validate(maintenancePlanRequestValidation.managerApproveMaintenancePlanRequest), maintenancePlanRequestController.managerApproveMaintenancePlanRequest)
router.patch('/maintenance-plans-requests/customer/approve', auth('customer_approve_maintenance_plan_request'), validate(maintenancePlanRequestValidation.customerApproveMaintenancePlanRequest), maintenancePlanRequestController.customerApproveMaintenancePlanRequest)


module.exports = router;