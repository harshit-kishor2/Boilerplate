/**
 * @desc    This file contain express configuration and third party middleware
 * @author  Harshit Kishor
 * @since   2021
 */

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
var cookieSession = require('cookie-session')

const app = express()

//Middleware...
/* //Create Coockie session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})) */

//Helmet
app.use(helmet());

app.use(cors());


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



// compress all responses
app.use(compression())

app.use(morgan('dev'));


module.exports = app

