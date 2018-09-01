const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// Our files
// MongoDB:
var User = require('./models/schema');

// Config and secret data:
const storeData = require('./route/storeData');
const config = require('./route/config');

// routes:
var login = require('./route/login');
var register = require('./route/register');
var profile = require('./route/profile');
// var message = require('./route/message');
var createNews = require('./route/createNews');
var Verify = require('./route/verify');

app.use(config);
app.use(register);
app.use(login);
app.use(profile);
app.use(createNews);
// app.use(message);

mongoose.connect(storeData.urlToMongo);

app.get('*', (req, res) => {
	res.render('index')
});

app.post('/verify', Verify.verifyOrdinaryUserCustom)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
