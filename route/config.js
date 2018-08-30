const express = require('express');
const passport = require('passport');     
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

module.exports = app
