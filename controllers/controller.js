// Dependencies ===========================================================

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var request = require('request');


////////////
// Routes //
////////////

router.get('/', function(req, res, next) {
    request(authorize, function(error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
    })
    res.render('index');
});

// router.post('/signin', function(req, res, body) {
//     username = req.body.username;
//     password = req.body.password;
//     console.log(username);
// }
// router.get('/signup', function(req,res, body){
//     res.render('signup');
// });

// router.post('/signup', function(req, res) {
//     var password = req.body.password;
//     var email = req.body.email;
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var phone = req.body.phone;
//     console.log("THIS IS BODY",req.body);
//     var newUser = new User();
//     newUser.password = password;
//     newUser.email = email;
//     newUser.firstName = firstName;
//     newUser.lastName = lastName;
//     newUser.phone = phone;
//     newUser.save(function(err, savedUser) {
//         if(err) {
//             console.log(err);
//             return res.status(500).send({error: "error saving user info"});
//         } else {
//             console.log ('Sucess:' , savedUser);
//             res.redirect('/city');
//             return res.status(200).send();
            
//         }
//     })

// });

module.exports = router;
