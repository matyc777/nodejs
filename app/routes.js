const rsaFunc = require('./rsa');
const localEncryptor = new rsaFunc("text");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//todo database dependencies

const users = [
    {id: '2jkhskf', login: 'nikit', password: 'qwerty'}
];

passport.use(new LocalStrategy(
    {usernameField: 'login'},
    (login, password, done) => {
        //database
        const user = users[0];
        if (login === user.login && password === user.password) {
            console.log('Local strategy returned true');
            return done(null, user);
        } else {
            console.log("bad");
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log("serr");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
     console.log('Inside deserializeUser callback');
//     console.log(`The user id passport saved in the session file store is: ${id}`);
    //database
    console.log(id);
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
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

    app.get('/authrequired', (req, res) => {
        //console.log(req.session.passport.user);
        if (req.isAuthenticated()) {
            res.redirect('/success');
        } else {
            res.redirect('/redirected');
        }
    });

    app.get('/redirected', (req, res) => {
        res.send('redirected');
    });

    app.get('/success', (req, res) => {
        res.send('success');
    });
};