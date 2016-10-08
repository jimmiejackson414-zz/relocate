'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');


//===================================================================

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/register', function(req, res, body) {
    res.render('register');
    // , { invalidLogin: 'Username or Password was incorrect; try again' }
});

router.get('/dashboard', function(req, res, body) {
    if (!req.cookies.loggedIn) {
    	console.log("Not logged in");
    	res.render('register', { errorMsg: 'You must create an account to access re/locate'});
    }else {
    	res.render('dashboard');	
    }
});

router.post('/dashboard/register', function(req, res) {
	var user = new User(req.body);
	console.log(req.body);
	user.save(function(err, doc) {
		if(err) {
			res.send(err);
		} else {
			res.cookie('loggedIn', 'true', {maxAge: 9000000, httpOnly: true});
			res.redirect('/dashboard');
		}

	});
});

router.post('/dashboard', (req, res) => {
        // console.log('login button hit');
        // console.log(req.body);
        let email = req.body.email;
        User.find({ email: email }).then((loginUser) => {
            // console.log(loginUser);
            // console.log(loginUser[0]);
            // console.log(loginUser[0].username);
            if (loginUser[0] === undefined) {
                // console.log('no such user');
                res.render('register', { errorMsg: 'No such user found in the database' });
            } else {
                // console.log('user in database');
                // console.log(req.body.password);
                // console.log(loginUser[0]);
                bcrypt.compare(req.body.password, loginUser[0].password, function (err, result) {
                	console.log(err, result);
                    if (result === true) {
                        res.cookie('loggedIn', 'true', { maxAge: 9000000, httpOnly: true });
                        res.redirect('/dashboard');
                    } else {
                        res.redirect('/register');
                    }
                });
            }
        });
    });



module.exports = router;
