const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./db/connection.js');



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//********************************
/**Example of using db crud methods**/
//var user = require('./db/crud/user');
//user.createUser("Max", "dada", 1234, 333);
//user.updateUser(1, "name", "Alex");
//user.getUser(1);
//user.getAllUsers();
//user.deleteUser(2);
//*******************************
const corsOptions = require('./app/cors_options');
//todo database dependencies

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
        return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(corsOptions);

require('./app/routes')(app);

app.listen(port);

console.log("Server is working on port: " + port);