/**
 * @desc    This file contain all env configuration keys 
 * @author  Harshit Kishor
 * @since   2021
 */
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EMAIL_SECRET_KEY: process.env.JWT_EMAIL_SECRET_KEY,
    JWT_PASSWORD_SECRET_KEY: process.env.JWT_PASSWORD_SECRET_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    NODE_ENV: process.env.NODE_ENV,
    LOG_DIR: process.env.LOG_DIR,
    LOG_LEVEL: process.env.LOG_LEVEL
}