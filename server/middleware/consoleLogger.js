/**
 * @desc    Middleware for console logging
 * @author  Harshit Kishor
 * @since   2021
 */

module.exports = (req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    console.log('Request Params:', req.body);
    next();
}