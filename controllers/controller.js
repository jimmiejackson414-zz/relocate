var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var request = require('request');

//global variable to hold selected city
// var city;
// var cityId;

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


module.exports = router;
