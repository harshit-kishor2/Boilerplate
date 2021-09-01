/**
 * @desc    This function is used for generating randomstring
 * @author  Harshit Kishor
 * @since   2021
 */
/**
 * 
 * @param {*} length length of token string
 */
const jwt = require('jsonwebtoken')

const randomString = (length) => {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const generateJWTToken = (payload, key) => {
    const token = jwt.sign(
        payload,
        key,
        { expiresIn: 3600 }
    );
    if (!token) {
        return "Token Error"
    }
    return token
}

const varifyJWTToken = (token, key) => {
    jwt.verify(token, key, (err, decodedToken) => {
        if (err) {
            return "Invalid Token"
        }
        return decodedToken
    })
}

module.exports = { generateJWTToken, randomString, varifyJWTToken }