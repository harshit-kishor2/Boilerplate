const { check } = require("express-validator");

exports.registerValidation = [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("mobile", "Mobile is required").not().isEmpty().isNumeric(),
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required").not().isEmpty(),
];
exports.loginValidation = [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
];