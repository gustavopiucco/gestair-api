const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validations');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

router.post('/', validate(userValidation.createUser), userController.createUser);
router.get('/:id', auth('get_user'), validate(userValidation.getUser), userController.getUser);
router.put('/:id', auth('update_user'), validate(userValidation.updateUser), userController.updateUser);

module.exports = router;