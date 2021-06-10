const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const unitController = require('../../controllers/unit.controller');

router.post('/', auth('create_unit'), unitController.createUnit);

module.exports = router;