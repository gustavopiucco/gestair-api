const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const customerController = require('../../controllers/customer.controller');

router.post('/', auth('create_customer'), customerController.createCustomer);

module.exports = router;