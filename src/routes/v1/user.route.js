const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

router.post('/', userController.createUser);
router.get('/', auth('get_user'), userController.getUser);
router.put('/:id/company', auth('update_user_company'), userController.updateUserCompany);
router.put('/:id/customer', auth('update_user_customer'), userController.updateUserCustomer);

module.exports = router;