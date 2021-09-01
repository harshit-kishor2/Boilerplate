/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Harshit Kishor
 * @since   2021
 */

/**
 * 
 * @param {*} message 
 * @param {*} data 
 * @param {*} response 
 */
exports.returnSuccessResponse = (message, data, response) => {
    const responseData = {}
    responseData.message = message;
    responseData.data = data;
    return response.json(responseData);
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 * @param {*} response 
 */
exports.returnErrorResponse = (message, data, response) => {
    const responseData = {}
    responseData.message = message;
    responseData.data = data;
    return response.status(500).json(responseData);
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 * @param {*} response 
 */
exports.returnValidationResponse = (message, data, response) => {
    const responseData = {}
    responseData.message = message;
    responseData.data = data;
    return response.status(422).json(responseData);
}


