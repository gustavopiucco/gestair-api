const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const companyController = require('../../controllers/company.controller');

router.post('/admin', auth('admin_create_company'), companyController.createCompany);

module.exports = router;