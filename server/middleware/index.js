const isAuth = require('./isAuth')
const isAuthenticate = require('./isAuthenticate')
const { genericErrorHandler, methodNotAllowed, notFound } = require('./errorHandlers')
const requestLogger = require('./requestLogger')
const { registerValidation, loginValidation } = require('./validation/user.validation')
const consoleLogger = require('./consoleLogger')
module.exports = {
    isAuth,
    isAuthenticate,
    genericErrorHandler,
    methodNotAllowed,
    notFound,
    requestLogger,
    registerValidation,
    loginValidation,
    consoleLogger
}