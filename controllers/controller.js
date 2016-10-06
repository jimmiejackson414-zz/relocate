var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');
var cookieParser = require('cookie-parser');


//===================================================================

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/register', function(req, res, body) {
    res.render('register');
});

router.get('/dashboard', function(req, res, body) {
    if (!req.cookies.loggedIn) {
    	console.log("Not logged in");
    	res.render('register', { errorMsg: 'You must create an account to access re||locate'});
    }else {
    	res.render('dashboard');	
    }
});

router.post('/dashboard/register', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, doc) {
		if(err) {
			res.send(err);
		} else {
			res.cookie('loggedIn', 'true', {maxAge: 900000, httpOnly: true});
			res.redirect('/dashboard');
		}

	});
});




module.exports = router;
