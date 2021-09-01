/**
 * @desc    This file contains password related routes
 * @author  Harshit Kishor
 * @since   2021
 */

const express = require('express');
const { frgtCtrl } = require('../controller');
const { isAuth } = require('../middleware');
const router = express.Router();


router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
