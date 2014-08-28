var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var MethodOverride = require('method-override');
var mongoose = require('mongoose');


var port = process.env.port || 8080;
var app = express();

var db = require('./config/database.js');
mongoose.connect(db.url);


require('./config/passport.js')(passport); // pass passport for configuration

//SET UP APPLICATION
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');


//SET UP PASSPORT
app.use(session({secret: 'BreezySecret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());





//routes
require('./app/routes.js')(app,passport);


app.listen(port);
console.log('Application Listening on Localhost:'+ port);





