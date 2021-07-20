const mysql = require('../database/mysql');


async function createMaintenancePlanRequest(requester_cpf,requester_firstname ,requester_lastname, description, equipment_id) {
    await mysql.execute('INSERT INTO maintenance_plans_requests (requester_cpf, requester_lastname, description, equipment_id) VALUES (?, ?, ?, ?)', [requester_cpf, requester_firstname,requester_lastname, description, equipment_id]);
}

async function getById(id){
    const [rows,fields] =  await mysql.pool.execute(`SELECT * FROM maintenance_plans_requests WHERE maintenance_plans_requests.id = ?`,[id]);
    return rows[0];
}

async function getMaintenancePlansRequestsByCustomerId(customer_id) {
    const [rows,fields] = await mysql.pool.execute(`SELECT * FROM maintenance_plans_requests 
    INNER JOIN equipments ON equipments.id = maintenance_plans_requests.equipment_id
    INNER JOIN enviroments ON enviroments.id = equipments.enviroment_id
    INNER JOIN units ON units.id = enviroments.unit_id
    WHERE units.customer_id = ? AND maintenance_plans_requests.approved_by_customer IS FALSE`,[customer_id]);
    return rows;
}

async function getMaintenancePlansRequestsByCompanyId(company_id){
    const [rows,fields] = await mysql.pool.execute(`SELECT * FROM maintenance_plans_requests 
    INNER JOIN equipments ON equipments.id = maintenance_plans_requests.equipment_id
    INNER JOIN enviroments ON enviroments.id = equipments.enviroment_id
    INNER JOIN units ON units.id = enviroments.unit_id
    INNER JOIN companies ON company.id = units.company_id
    WHERE company.id = ? AND maintenance_plans_requests.approved_by_manager IS FALSE`,[company_id]);
    return rows;
}


async function customerApproveMaintenancePlanRequest(maintenance_plan_request_id, timestamp){
   await mysql.pool.execute(`UPDATE maintenance_plans_requests 
   SET approved_by_customer = TRUE,
   SET approved_by_client_at = ?
   WHERE maintenance_plans_requests.id = ?
   `,[timestamp,maintenance_plan_request_id])
}


async function managerApproveMaintenancePlanRequest(maintenance_plan_request_id, timestamp){
    await mysql.pool.execute(`UPDATE maintenance_plans_requests 
    SET approved_by_manager = TRUE,
    SET approved_by_manager_at = ?
    WHERE maintenance_plans_requests.id = ?
    `,[timestamp,maintenance_plan_request_id])
 }
 










module.exports = {
    createMaintenancePlanRequest,
    managerApproveMaintenancePlanRequest,
    customerApproveMaintenancePlanRequest,
    getMaintenancePlansRequestsByCompanyId,
    getMaintenancePlansRequestsByCustomerId,
    getById
}
