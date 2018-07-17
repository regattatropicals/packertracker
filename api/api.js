const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const expressJWT = require('express-jwt');

const PORT = process.env['APP_PORT']
const DBHOST = process.env['RDS_HOSTNAME']
const DBUSER = process.env['RDS_USERNAME']
const DBPASS = process.env['RDS_PASSWORD']
const JWTSEC = process.env['JWTSEC']
if (!PORT) {
    throw new Error('Must have application port stored in environment variable APP_PORT');
}
if (!DBHOST) {
    throw new Error('Must have DB connection host stored in environment variable RDS_HOSTNAME');
}
if (!DBUSER) {
    throw new Error('Must have DB connection username stored in environment variable RDS_USERNAME');
}
if (!DBPASS) {
    throw new Error('Must have DB connection password stored in environment variable RDS_PASSWORD');
}
if (!JWTSEC) {
    throw new Error('Must have JWT Secret stored in environment variable JWTSEC');
}

const login = require('./routes/login');
const index = require('./routes/index');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(expressJWT({
    secret: JWTSEC,
    getToken: (req) => {
        if (req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }
}).unless({path: ['/', '/api/login']}));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.sendStatus(401);
    }
});
app.use(express.json());
app.use('/api/login', login);
app.use('/static', express.static(path.resolve('dist/static')));
app.use('/', index);

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
});
