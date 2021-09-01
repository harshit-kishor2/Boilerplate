const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    passwordUpdatedAt: {
        type: Date,
        default: Date.now(),
    },
    lastLogin: {
        type: Date,
    },
    loginAttempt: {
        type: Number,
        default: 0,
    },
    resetPasswordToken: {
        type: String,
    },
    emailVarificationToken: {
        type: String,
    },
    authToken: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Deleted'],
    },
    userType: {
        type: String,
        enum: ['Admin', 'User'],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);