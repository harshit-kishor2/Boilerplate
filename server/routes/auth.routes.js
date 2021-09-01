/**
 * @desc    This file contains all auth related routes
 * @author  Harshit Kishor
 * @since   2021
 */

const express = require('express');
const { authCtrl } = require('../controller');
const { registerValidation, loginValidation } = require('../middleware');
const router = express.Router();

router.route('/register')
    .post(registerValidation, authCtrl.register);

router.route('/login')
    .post(loginValidation, authCtrl.login);

router.route('/logout')
    .get(authCtrl.logoutUser);

router.route('/varify-email')
    .post(authCtrl.varifyEmail);


module.exports = router;