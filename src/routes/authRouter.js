const express = require('express');
const router = express.Router();
const {register} = require('../controllers/authController.js');
const { route } = require('./authRouter.js');

router.route('/register').post(register)

module.exports = router;