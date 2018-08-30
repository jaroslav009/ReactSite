const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const storeData = require('./storeData');
const verify = require('./verify');

var router = express.Router();

const User = require('../models/schema');
const passAuth = require('./authenticate/authenticate');

router.post('/login', function (req, res) {
    let authorization = false;
    var token = req.body.token
    console.log(token)

    if(token === undefined) {
        jwt.verify(token, storeData.secretKey, (err, decoded) => {
            if(err) return console.log(err);
            console.log('decoded ' + JSON.stringify(decoded));
            if(decoded) {
                console.log('you authorization')
                authorization = true;
            }
        })
    }
    passport.authenticate('local', {session: false}, (err, user) => {
        
        if(authorization) return false;
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
               res.send(err);
                console.log(err)
            }
            console.log('user  '+JSON.stringify(user));
            var data = {
                username: user.email
            }
            const token = verify.getToken(data);

            User.findOne({username: user.username}, function(err, user) {
                if(err) return console.log(err);
                console.log('token ' + token)
                user.token = token;
                user.test = 'test';
                user.save(function(err, user) {
                    if(err) return console.log(err);
                    console.log('user token save ' + JSON.stringify(user));
                })
            })

            return res.json({token, redirectServ: true});
        });
    })(req, res);
});

module.exports = router;
