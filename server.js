const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//todo database dependencies

const users = [
    {id: '2jkhskf', login: 'nikit', password: 'qwerty'}
];

passport.use(new LocalStrategy(
    { usernameField: 'login' },
    (login, password, done) => {
        console.log('Inside local strategy callback');
        //database
        const user = users[0];
        if(login === user.login && password === user.password) {
            console.log('Local strategy returned true');
            return done(null, user)
        }else{
            console.log("bad");
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

const app = express();
const port = process.env.PORT || 3003;
//const morgan = require('morgan');
const methodOverride = require('method-override');

app.use(express.static('./public'));
//app.use(morgan('dev'));//requests to th console
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function');
        console.log(`Request object sessionID from client: ${req.sessionID}`);
        return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//require('./app/routes')(app);


app.post('/authentication', function(req, res, next) {
    /*let text = "qwerty";
    let enctext = localEncryptor.encrypt(text);
    console.log(enctext);
    console.log(localEncryptor.decrypt(enctext));*/
    console.log(req.body);


    console.log('Inside POST /login callback');
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        req.login(user, (err) => {
            console.log('Inside req.login() callback');
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);


    //if (req.body.login === "nikita" && localEncryptor.decrypt(req.body.password) === "qwerty") res.send("all right");//???
    //else res.send("wrong data");
    //todo check for existing user
});

app.get('/authrequired', (req, res) => {
    console.log('Inside GET /authrequired callback');
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if(req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/redirected');
    }
});


app.get('/redirected', (req, res)=>{
    res.send('redirected');
});
//res.sendFile(__dirname + '/tratata/front/index.html');
// app.get('*', function(req, res){
//     console.log(req);
//     res.send('You hit the home page without restarting the server automatically\n')
// });

// app.get('*', function(req,res){
//     res.sendFile('/home/nikita/WebstormProjects/nodejs/public/index.html');
// });

app.listen(port);

console.log("Server is working on port: " + port);