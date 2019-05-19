const rsaFunc = require('./rsa');
const localEncryptor = new rsaFunc("text");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../db/connection.js');

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database");
});

const userCrud = require('../db/crud/user');
const courierCrud = require('../db/crud/courier');
const requestCrud = require('../db/crud/request');

passport.use(new LocalStrategy(
    {usernameField: 'login'},
    (login, password, done) => {
        userCrud.getUserByLogin(login, function (err, user) {
            if (err) {
                return done(null, false);
            } else if (login == user[0].login && password == user[0].password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

passport.deserializeUser((id, done) => {
    userCrud.getUser(id, function (err, user) {
        if (err) {
            console.log(err);
            return done(null, false);
        } else {
            return done(null, user);

        }
    });
});

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    /**json in body
    {
        "login":"sanya",
        "password":"123456"
    }
     **/
    app.post('/login', function (req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            req.login(user, (err) => {
                if (user === false) return res.status(400).send("Wrong login or password")
                else return res.status(200).send("Success");
            })
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send("Logged out");
    });

    /**json in body
    {
        "login":"nikita",
        "password":"123456",
        "name":"Paul",
        "phone":"6208360",
        "role":"user"
    }**/
    app.post('/register', function (req, res) {
        switch (req.body.role) {
            case "user":
                userCrud.createUser(req.body.name, req.body.login, req.body.password, req.body.phone);
                res.status(200).send("User(client) created");
                break;
            case "courier":
                courierCrud.createCourier(req.body.name, req.body.login, req.body.password, req.body.phone);
                res.status(200).send("User(courier) created");
                break;
            default:
                res.status(400).send("Wrong request body");
                break;
        }
    });


    /**json in body
    {
        "from":"Grodno",
        "to":"Minsk",
        "weight":"100",
        "deadline":"29.05.2019"
    }**/
    app.post('/request', (req, res) => {
        if (req.isAuthenticated()) {
            requestCrud.createRequest(req.body.from, req.body.to, req.body.weight, req.body.deadline, req.session.passport.user, null);
            res.status(200).send("Added");
        } else {
            res.status(401).send("Unauthorized");
        }
    });

    /**json in body
    {
        "requestId":"13"
    }**/
    app.post('/applyingrequest', (req, res) => {
        userCrud.getUser(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err);
                res.status(520).send("Unknown error");
                return;
            }
            if (req.isAuthenticated()) {
                if (user[0].role === 'courier') {
                    requestCrud.getRequest(req.body.requestId, function (err, request) {
                        if (err) {
                            console.log(err);
                            res.status(520).send("Unknown error");
                            return;
                        }
                        console.log(request);
                        if (!request[0]) {
                            res.status(404).send("There is no request with such id: " + req.body.requestId);
                        }
                        else if(request[0].courier){
                            res.status(403).send("This request already has a courier");
                        } else {
                            requestCrud.updateRequest(req.body.requestId, 'courier', req.session.passport.user);
                            res.status(200).send("OK");
                        }
                    });
                } else res.status(403).send("Insufficient rights");
            } else {
                res.status(401).send("Unauthorized");
            }
        });
    });

    /**../request?id=
    only client can delete request
     **/
    app.delete('/request', (req, res) => {
        if (req.isAuthenticated()) {
            requestCrud.getRequest(req.query.id, function (err, request) {
                if (err) {
                    console.log(err);
                    res.status(520).send("Unknown error");
                    return;
                }
                if (!request[0]) {
                    res.status(404).send("There is no request with such id: " + req.query.id);
                    return;
                }
                if (req.session.passport.user === request[0].client) {
                    requestCrud.deleteRequest(req.query.id);
                    res.status(200).send("OK");
                } else res.status(403).send("Insufficient rights");
            });
        } else res.status(401).send("Unauthorized");
    });

    app.get('/requests', (req, res) => {
        if (req.isAuthenticated()) {
            userCrud.getUser(req.session.passport.user, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(520).send("Unknown error");
                    return;
                }
                requestCrud.getRequestByField(user[0].role, req.session.passport.user, function (err, request) {
                    if (err) {
                        console.log(err);
                        res.status(520).send("Unknown error");
                        return;
                    }
                    res.status(200).json(request);
                });
            });
        } else res.status(403).send("Insufficient rights");
    });

    /**../profile?id=*/
    app.get('/profile', (req, res) => {
        userCrud.getUser(req.query.id, function (err, user) {
            if (err) {
                console.log(err);
                res.status(520).send("Unknown error");
                return;
            }
            if (!user[0]) {
                res.status(404).send("There is no user with such id: " + req.query.id);
                return;
            }
            res.status(200).json(user[0]);
        });
    });
};