module.exports = function (app) {
    var log = require('../libs/log')(module);
    var User = require('../models/user').User;

    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, result) {
            if (err) return next(err);
            res.json(result);
        });
        // res.send("Error Users Page", 500);
        // log.log('silly', "127.0.0.1 - there's no place like home");
        // log.error('test Logger winston');
        // log.info('test Logger winston');
        // log.warn('test Logger winston');
    });

    app.get('/users/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, result) {
            if (err) {
                res.send("Server Eror",
                    404
                );
                return;
            }
            if (!result) {
                res.send("Server Eror",
                    404
                );
            } else {
                res.json(result);
            }
        });
    });
    app.post('/users', function (req, res) {
        console.log(req.body.username, req.body.hashedPassword, req.body.salt);
        var newUser = User({
            username: req.body.username,
            hashedPassword: req.body.hashedPassword,
            salt: req.body.salt
        });
        newUser.save(function (err) {
            if (err) throw err;

            console.log('User created!');
        });

        res.send("ok", 200);
    });

    app.put('/users/:id', function (req, res) {
        console.log(req.body.username, req.body.hashedPassword, req.body.salt, req.params.id);
        User.findById(req.params.id, function(err, user) {
            if (err) throw err;

            // change the users location
            user.username = req.body.username;

            // save the user
            user.save(function(err) {
                if (err) throw err;
                console.log('User successfully updated!');
                res.send("ok", 200);
            });

        });
    });
}