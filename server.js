//Dependencies===========================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//Configure the app======================================
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));

// configure app with morgan and boodyparser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser())

// Database configuration for mongoose
// db: relocate
mongoose.connect('mongodb://localhost/relocate');
// mongoose.connect('mongodb://heroku_1jbqk95l:rk08ssh75engfe5hbpvg2ivs5p@ds049456.mlab.com:49456/heroku_1jbqk95l');
// hook mongoose connection to db
var db = mongoose.connection;

// log any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// log a success message when we connect to our mongoDB collection with no issues
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var User = require('./models/user.js');


///////

// create a user a new user
// var testUser = new User({
//     username: 'jmar777',
//     password: 'Password123'
// });

// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;

//     // fetch user and test password verification
//     User.findOne({ username: 'jmar777' }, function(err, user) {
//         if (err) throw err;

//         // test a matching password
//         user.comparePassword('Password123', function(err, isMatch) {
//             if (err) throw err;
//             console.log('Password123:', isMatch); // -> Password123: true
//         });

//         // test a failing password
//         user.comparePassword('123Password', function(err, isMatch) {
//             if (err) throw err;
//             console.log('123Password:', isMatch); // -> 123Password: false
//         });
//     });
// });

///////


// Routes
var routes = require('./controllers/controller.js');
app.use('/', routes);

//MAKE THE CONNECTION=================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});

