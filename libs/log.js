//Windows
var winston = require('winston');
var ENV = process.env.NODE_ENV;

//can be much more flexible then that
function getLogger(module) {
    var path = module.filename.split('\\').slice(-2).join('\\');

    return new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                colorize: true,
                level: (ENV == 'development') ? 'silly' : 'error',
                label: path
            }),
            new (winston.transports.File)({
                name: 'error-file',
                filename: 'filelog-error.log',
                level: 'error'

            })
        ]
    });
}

module.exports = getLogger;


//MacBook

/*
var winston = require('winston');
var ENV = process.env.NODE_ENV;

//can be much more flexible then that
function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;
*/