/**
 * @desc    This file contain Swagger configuration for api testing
 * @author  Harshit Kishor
 * @since   2021
 */

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description:
            "React Boilerplate Code",
        contact: {
            name: "Harshit Kishor"
        },
    },
    servers: [
        {
            url: "http://localhost:3100/api/",
        },
    ],
}

const options = {
    definition: swaggerDefinition,
    apis: ["server.js", "./routes/*.js"],
};

const swagger = swaggerJsdoc(options);

module.exports = swagger;