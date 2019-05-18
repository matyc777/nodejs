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

const users = [
    {id: '6', login: 'nikit', password: 'qwerty'}
];

passport.use(new LocalStrategy(
    {usernameField: 'login'},
    (login, password, done) => {
        //database
        userCrud.getUserByLogin(login, function (err, user) {
            // console.log("local");
            // console.log(typeof (user[0].password));
            // console.log(typeof (password));
             console.log(user[0].login);
            console.log(login);
            if (err) {
                console.log("qwe");
                console.log(err);
                return done(null, false);
            } else if (login == user[0].login && password == user[0].password) {
                console.log('Local strategy returned true');
                return done(null, user);
            } else {
                console.log("bad");
                //return done(null, false);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

passport.deserializeUser((id, done) => {
    //database
    console.log("desr");
    console.log(id);
    userCrud.getUser(id, function (err, user) {
        if (err) {
            console.log(err);
            return done(null, false);
        } else {
            console.log("found");
            return done(null, user);

        }
    });
    /*const user = users[0].id === id ? users[0] : false;
    console.log("desr");
    console.log(user);
    done(null, user);*/
});

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/requestList/:user_id', function (req, res) {
        //todo get request list from database by user_id
    });

    app.post('/login', function (req, res, next) {
        /*let text = "qwerty";
        let enctext = localEncryptor.encrypt(text);
        console.log(enctext);
        console.log(localEncryptor.decrypt(enctext));*/
        passport.authenticate('local', (err, user, info) => {
            req.login(user, (err) => {
                if (user === false) return res.json({"success": false});
                else return res.json({"success": true});
            })
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send("logged out");
    });

    app.post('/register', function (req, res) {
        switch (req.body.role) {
            case "user":
                userCrud.createUser(req.body.name, req.body.login, req.body.password, req.body.phone);
                res.json({"success": true});
                break;
            case "courier":
                courierCrud.createCourier(req.body.name, req.body.login, req.body.password, req.body.phone);
                res.json({"success": true});
                break;
            default:
                res.json({"success": false});
                break;
        }
    });

    app.post('/request', (req, res) => {
        //let test = undefined;
        //console.log(req.body.to);
        // console.log(req.body);
        // console.log(req.body.from);
        // console.log(req.body.to);
        // console.log(req.body.weight);
        // console.log(req.body.deadline);
        //console.log(req.session.passport);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            requestCrud.createRequest(req.body.from, req.body.to, req.body.weight, req.body.deadline, req.session.passport.user, null);
            //console.log(req.body.deadline);
            res.json({"success": true});
        } else {
            res.redirect('/authrequired');
        }
    });

    app.post('/applyingrequest', (req, res) => {
        //let role = undefined;
        let user
        userCrud.getUser(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(user);
            if (req.isAuthenticated() && user[0].role === 'courier') {
                requestCrud.updateRequest(req.body.requestId, 'courier', req.session.passport.user);
                res.json({"success": true});
            } else {
                res.json({"access": false});
            }
        });


    });

    app.delete('/request', (req, res) => {
        if (req.isAuthenticated()) {
            requestCrud.deleteRequest(req.body.id);
            res.json({"success": true});
        } else res.redirect('/authrequired');
    });

    app.get('/profile/:user_id', (req, res) => {

    });

    app.get('/authrequired', (req, res) => {
        res.json({"access": false});
    });

    app.get('/success', (req, res) => {
        userCrud.getUserByLogin('nikita', function (err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(user[0].login);
        });
        res.send('success');
    });
};