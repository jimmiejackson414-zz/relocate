//////////////////
// Dependencies //
//////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');


///////////////////////
// Configure the app //
///////////////////////

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));

// make public a static directory
app.use(express.static('public'));

// Database configuration with mongoose
mongoose.connect('mongodb://localhost/DBNAME');
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

// BRING IN MODELS HERE
// var Note = require('.models/Note.js');


////////////
// ROUTES //
////////////

// var routes = require('./controllers/controller.js');
// app.use('/', routes);


/////////////////////////
// MAKE THE CONNECTION //
/////////////////////////

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});

