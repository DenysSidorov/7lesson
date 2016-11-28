var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('cookie-session');
var mongoose = require('./config/mongo-connect');

var nconf = require('nconf');
var config = require('./config');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
        name: 'session',
        secret: config.get('session:secret'),
        // keys: ['key1', 'key2'],
        keys: config.get('session:keys'),
        cookie: config.get('session:cookie'),
        // cookie: { secure: true,
        //     httpOnly: true,
            // domain: 'example.com',
            // path: 'foo/bar',
            // expires: expiryDate
        // }
    store: new MongoStore({ mongooseConnection: mongoose.connection }) // настройки монго-сессии
    })
);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));﻿

var log = require('./libs/log')(module);


require('./routes/index')(app);


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
