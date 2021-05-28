const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

router.post('/', auth('gestair_admin'), userController.createUser);
router.get('/', auth('gestair_admin'), userController.getUser);

module.exports = router;