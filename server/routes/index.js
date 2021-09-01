const authRoutes = require('./auth.routes')
const csrfRoutes = require('./csrf.routes')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const routes = (app) => {
    var csrfProtection = csrf(
        {
            cookie: true
        })


    // mount auth routes at /auth
    app.use('/api/auth', authRoutes);

    // mount forgotPAssword routes at /password
    app.use('/api/csrf', cookieParser(), csrfProtection, csrfRoutes);

}

module.exports = routes