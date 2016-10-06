var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var request = require('request');


//===================================================================

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/register', function(req, res, body) {
    res.render('register');
});

router.get('/dashboard', function(req, res, body) {
    res.render('dashboard');
})

// router.post('/submit', function(req, res) {
// 	var user = new User(req.body);
// 	user.save(function(err, doc) {
// 		if(err) {
// 			res.send(err);
// 		} else {
// 			res.send(doc);
// 		}

// 	});
// });


module.exports = router;
