const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

router.post('/', userController.createUser);
router.get('/', auth('get_user'), userController.getUser);
router.put('/admin', auth('admin_update_user'), userController.adminUpdateUser);

module.exports = router;