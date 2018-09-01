const express = require('express')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt'); 

var User = require('../models/schema')
const storeData = require('./storeData');
var app = express();

var usernameCorrect = false;
var emailCorrect = false;

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
}

app.get('/confirm-password', function(req, res) {
    res.render('confirm-password', {
        id: req.query.id
    });
    console.log('req ' + req.query.id)
});

app.post('/confirm-password', function(req, res) {
    console.log("body " + req.body.password + ' ' + req.body.id_user)
    var password = req.body.password;
    var id_user = req.body.id_user;
    User.findOne({uid: id_user}, function(err, user) {
        if(err) return err;
        console.log(user);
        user.password = createHash(password);
        user.active = true;
        user.save(function(err) {
            if(err) return console.log(err);
            res.json({redirectUser: true})
        })
    })
});

app.get('/verify', function(req, res) {
    console.log('req.protocol  '+req.query.id);
    User.findOne({uid: req.query.id}, function(err, user) {
        if(err) return res.status(404);
        console.log("email is verified " + req.query.id);
        res.redirect("http://"+req.get('host')+"/confirm-password?id="+req.query.id);
    })
});

app.post('/register', function(req, res) {

        if(usernameCorrect) {
            console.log('username exist')
            return false;
        }
        else if(emailCorrect) {
            console.log('email exist')
            return false;
        }

        else {
            User.findOne({email: req.body.email}, function(err, email) {
                if(err) return err
                if(email) {
                    console.log('Email already exists');
                    emailCorrect = true;
                }
                else {
                    emailCorrect = false;
                }
            })
            if(emailCorrect == true) return false;

            var username = req.body.username,
                email = req.body.email,
                first_name = req.body.first_name,
                last_name = req.body.last_name,
                country = req.body.country;
                city = req.body.city;
            var rand = jwt.sign({
                id: email,
              }, storeData.secretKey, {
                expiresIn: 30
              });

            User.create({
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                country: country,
                city: city,
                uid: rand,
                active: 0
            }, function(err, doc) {
                if(err) return console.log('Error create user ' + err);
                console.log('user save ' + JSON.stringify(doc));
            });

            confirmRegister = true;
            
            var link = "http://"+req.get('host')+"/verify?id="+rand;
            host = req.get('host');
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "jaroslav.iliuk@gmail.com", //your email
                    pass: "DDsdfg22$" // pass for email
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            console.log('gmail out');
            mailOptions = {
                from: "jaroslav.iliuk@gmail.com",
                to: req.param('email'),
                subject: 'Verify your data',
                html : `
                    Hello
                    Please Click on the link to verify your email.
                    <a href="+link+">Click here to verify</a>
                `
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
            res.json({confirmRegister: true})
        }

    }
);

app.post('/registerConfirm', (req, res) => {
    var redirectRegister = false;
    if(usernameCorrect) {
        //username exist
        redirectRegister = false;
        return false;
    }
    else if(emailCorrect) {
        //email exist
        redirectRegister = false;
        return false;
    } else {
        redirectRegister = true;
        return res.json({redirectRegister: redirectRegister})
    }
})

app.post('/changeUser', (req, res) => {
	console.log('changeUser ' + ' usernameCorrect ' + usernameCorrect + ' username ' + req.body.username)
	User.findOne({username: req.body.username}, function (err, user) {
		if(err) return err
		if(user) {
            console.log('User already exists');
            usernameCorrect = true;
            return res.json({usernameCorrect: usernameCorrect});
		}
		else {
			console.log('User')
			usernameCorrect = false;
			return res.json({usernameCorrect: usernameCorrect});
		}
    })
})

app.post('/changeEmail', (req, res) => {
    console.log('changeEmail ' + ' emailCorrect ' + emailCorrect + ' email ' + req.body.email)
	User.findOne({email: req.body.email}, function(err, email) {
        if(err) return err
        if(email) {
            console.log('Email already exists');
            emailCorrect = true;
            return res.json({emailCorrect: emailCorrect});
        }
        else {
            console.log('Email')
            emailCorrect = false;
            return res.json({emailCorrect: emailCorrect});
        }
	})
})



module.exports = app;
