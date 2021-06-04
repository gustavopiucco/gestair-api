const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

router.post('/', auth('create_user'), userController.createUser);
router.get('/', auth('get_user'), userController.getUser);

module.exports = router;