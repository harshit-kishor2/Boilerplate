const { returnSuccessResponse, returnErrorResponse, returnValidationResponse } = require("../utils/responseApi");
const { generateJWTToken, varifyJWTToken } = require("../utils/randomString");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require("../config/config");
const jwt = require('jsonwebtoken')
const { sendNodeEmail } = require('../utils/sendEmail')

/**
 * @desc    Register a new user
 * @method  POST api/auth/register
 * @access  public 
 */
exports.register = async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return returnValidationResponse(errors[0].msg, {}, res)

    const { firstName, lastName, mobile, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });

        // Check the user email
        if (user)
            return returnValidationResponse("Email already exists.", {}, res)

        let newUser = new User({
            firstName,
            lastName,
            mobile,
            email: email.toLowerCase().replace(/\s+/, ""),
            password,
            //  lastLogin: Date.now(),
            emailVarificationToken: '',
            resetPasswordToken: '',
            authToken: '',
            status: 'Inactive',
            userType: "User"
        });
        //Generate Varification token
        const token = generateJWTToken({
            mobile: newUser.mobile,
            email: newUser.email
        }, config.JWT_EMAIL_SECRET_KEY)
        newUser.emailVarificationToken = token

        // Hash the password
        const hash = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, hash);

        // Save the user
        await newUser.save((error, user) => {
            if (error) {
                return returnErrorResponse(error.message, {}, res)
            }
            else {
                sendNodeEmail({
                    from: "Harshit Kishor",
                    to: email,
                    subject: "Varification email",
                    text: `
                    Please varify your mail URL 
                    http://localhost:3000/#/email-varify/${newUser.emailVarificationToken}
                    `
                })
                // Send the response to server
                return returnSuccessResponse("Registered successfully.", user, res)
            }
        });
    } catch (err) {
        return returnErrorResponse(err.message, {}, res)
    }
};

exports.varifyEmail = async (req, res) => {
    try {
        const { token } = req.body
        if (!token) {
            return returnErrorResponse("Token not available", {}, res)
        }
        jwt.verify(token, config.JWT_EMAIL_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                return returnErrorResponse(err.message, {}, res)
            }
            let filterQuery = { email: decodedToken.email.toLowerCase(), emailVarificationToken: token }
            let updateUser = {
                emailVarificationToken: '',
                status: 'Active',
                varified: true,
                verifiedAt: Date.now(),
                updatedAt: Date.now()
            }
            await User.findOneAndUpdate(filterQuery, updateUser, { new: true })
                .then(user => {
                    if (!user) {
                        return returnErrorResponse("No data found", {}, res)
                    }
                    return returnSuccessResponse("Varified successfully.", user, res)
                })
                .catch(err => {
                    return returnErrorResponse(err.message, {}, res)
                })
        })
    } catch (err) {
        return returnErrorResponse(err.message, {}, res)
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return returnValidationResponse(errors[0].msg, {}, res)

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return returnErrorResponse("Email Not Found", {}, res)
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return returnErrorResponse("Password not match", {}, res)
            } else if (!user.verified) {
                return returnErrorResponse("User Not Verified", {}, res)
            }
            else if (user.status !== "Active") {
                return returnErrorResponse("User Not Active", {}, res)
            } else {
                let token = generateJWTToken({
                    id: user._id,
                    email: user.email
                }, config.JWT_SECRET_KEY)

                let updateUser = {
                    authToken: token,
                    loginAttempt: 0,
                    lastLogin: Date.now(),
                    updatedAt: Date.now()
                }

                await User.findByIdAndUpdate(user._id, updateUser, { new: true })
                    .then(updatedUser => {
                        if (!updatedUser) {
                            return returnErrorResponse("Sorry Some problem", {}, res)
                        }
                        //Set coockie
                        res.cookie('token', token, {
                            maxAge: 60 * 60 * 1000, // 1 hour
                            httpOnly: true,
                            // secure: true,
                            sameSite: true,
                        });
                        delete updatedUser.password
                        delete updatedUser.authToken
                        delete updatedUser.resetPasswordToken

                        return returnSuccessResponse("Login successfully.", updatedUser, res)
                    })
                    .catch(err => {
                        return returnErrorResponse(err.message, {}, res)
                    })
            }

        }

    } catch (err) {
        return returnErrorResponse(err.message, {}, res)
    }
}

exports.logoutUser = (req, res) => {
    //set blank cookie
    res.cookie('token', '', {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        // secure: true,
        sameSite: true,
    });
    return returnSuccessResponse('Logout successfully.', {}, res);
};
