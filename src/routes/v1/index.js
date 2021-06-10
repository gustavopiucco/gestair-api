const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const companyRoute = require('./company.route');
const customerRoute = require('./customer.route');
const unitRoute = require('./unit.route');

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/companies', companyRoute);
router.use('/customers', customerRoute);
router.use('/units', unitRoute);
module.exports = router;