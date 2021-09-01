const { successResponse, errorResponse, validationResponse } = require("../utils/responseApi");
const { randomString } = require("../utils/randomString");
const User = require("../models/User");
const Verification = require("../models/Verification");
const bcrypt = require("bcryptjs");
const HttpStatus = require('http-status-codes');

/**
 * @desc    Forgot user password
 * @method  POST api/password/forgot
 * @access  public
 */
exports.forgot = async (req, res) => {
    const { email } = req.body;

    // Check the token
    if (!email)
        return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json(validationResponse([{ msg: "Email is required" }]));

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        // Check the user
        if (!user)
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json(errorResponse("User not found", res.statusCode));

        // If user exists
        // We're gonna make a new verification data
        let verification = await Verification.findOne({
            userId: user._id,
            type: "Forgot Password"
        });

        // But, we're gonna check the previous verification data is still exist or not
        // If not exist, make a new verificaition data
        if (verification) {
            verification = await Verification.findByIdAndRemove(verification._id);
        }

        // Create a new verification data
        let newVerification = new Verification({
            token: randomString(50),
            userId: user._id,
            type: "Forgot Password"
        });

        // Save the verification data
        await newVerification.save();

        // Send the response
        res
            .status(HttpStatus.StatusCodes.CREATED)
            .json(
                successResponse(
                    "Forgot Password verification has been sent",
                    { verification: newVerification },
                    res.statusCode
                )
            );
    } catch (err) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse("Server error", res.statusCode));
    }
};

/**
 * @desc    Resetting user password
 * @method  POST api/password/reset
 * @access  public
 */
exports.reset = async (req, res) => {
    const { token, password } = req.body;

    // Check the token first
    if (!token)
        return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json(validationResponse([{ msg: "Token is required" }]));

    // Check the password
    if (!password)
        return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json(validationResponse([{ msg: "Password is required" }]));

    try {
        let verification = await Verification.findOne({
            token,
            type: "Forgot Password"
        });

        // Check the verification data
        if (!verification)
            return res
                .status(HttpStatus.StatusCodes.BAD_REQUEST)
                .json(
                    errorResponse("Token / Data that you input is not valid", res.statusCode)
                );

        // If there's verification data
        // Let's find the user first
        let user = await User.findById(verification.userId);

        // Check the user, just in case
        if (!user)
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json(errorResponse("User not found", res.statusCode));

        // if those condition all passed
        // Let's update the password
        // Dont forget to hash the password using bcrypt
        let hash = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, hash);

        // Finnaly, update the user password
        user = await User.findByIdAndUpdate(user._id, {
            password: hashedPassword
        });

        // Lets delete the verification data
        verification = await Verification.findByIdAndRemove(verification._id);

        // Send the response
        res
            .status(HttpStatus.StatusCodes.OK)
            .json(successResponse("Password has been updated", null, res.statusCode));
    } catch (err) {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse("Server error", res.statusCode));
    }
};