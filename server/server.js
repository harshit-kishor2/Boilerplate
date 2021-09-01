/**
 * @desc    This is the main file which is used to run server
 * @author  Harshit Kishor
 * @since   2021
 */

const app = require('./config/express')
const swaggerUi = require('swagger-ui-express')
const config = require('./config/config')
const swagger = require('./config/swagger');
const mdlwr = require('./middleware');
const routes = require('./routes');
const connectToMongoDB = require("./config/database");


//Connect database
connectToMongoDB()

/* //Winston logger
app.use(mdlwr.requestLogger);
 */

//Console Logger for request
app.use(mdlwr.consoleLogger)

/* // Swagger api-docs
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swagger)
);
 */
// Router
routes(app)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error Handler Middleware
app.use(mdlwr.notFound);
app.use(mdlwr.methodNotAllowed);
app.use(mdlwr.genericErrorHandler);


/**
 * For connecting server
 */
const serverStatus = app.listen(config.PORT, () => {
    console.log(`Listening at http://localhost:${config.PORT}`)
})
serverStatus.on('error', console.error);