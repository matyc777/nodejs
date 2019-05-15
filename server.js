const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
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