/**
 * @desc    Middleware for authenticating user
 * @author  Harshit Kishor
 * @since   2021
 */

const config = require('../config/config')
module.exports = async (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    // Split the authorization header value
    const splitAuthorizationHeader = authorizationHeader.split(" ");

    // Get the type of token and actual token
    const bearer = splitAuthorizationHeader[0];
    const token = splitAuthorizationHeader[1];

    // Check the type
    if (bearer !== "Bearer")
        return res
            .status(400)
            .json(error("The type is must be a Bearer", res.statusCode));

    // Check the token
    if (!token) return res.status(404).json(error("No token found"));

    try {
        const jwtData = await jwt.verify(token, config.JWT_SECRET_KEY);

        // Check the JWT token
        if (!jwtData)
            return res.status(401).json(error("Unauthorized", res.statusCode));

        // If is a valid token that JWT verify
        // Insert the data to the request
        req.user = jwtData.user;

        // Continue the action
        next();
    } catch (err) {
        res.status(401).json(error("Unauthorized", res.statusCode));
    }
};