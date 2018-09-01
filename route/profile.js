const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary');

const storeData = require('./storeData');
const User = require('../models/schema');

// init cloudinary
cloudinary.config({ 
  cloud_name: 'dpmdahanv', 
  api_key: storeData.api_key, 
  api_secret: storeData.api_secret
});

// init multer
var storage = multer.diskStorage({
	filename: function(req, file, callback) {
	  callback(null, Date.now() + file.originalname);
	}
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var app = express();

app.post('/upload', upload.single('image'), (req, res) => {
	console.log('avatar ' + JSON.stringify(req.file))
	console.log('token ' + JSON.stringify(req.body.token))
	cloudinary.uploader.upload(req.file.path, function(result) {
	
		jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
			console.log(decoded)
			if(decoded === undefined) return false;
			console.log(result)
			User.findOne({ email: decoded.username }, (err, user) => {
				if(err) return console.log(err);
				if(!user) return res.json({ err: 'not exist user' });
				console.log(JSON.stringify('result.url ' + result.url));

				cloudinary.v2.uploader.destroy(user.profile.name, function(error, result){console.log('result '+JSON.stringify(result))});

				user.profile.url = result.url;
				user.profile.name = result.public_id;

				user.save(function(err, user) {
					if(err) return console.log(err);
					console.log('user save ' + JSON.stringify(user.profile));
					res.json({image: user.profile.url, image_name: user.profile.name})
				})
			})
		});

	});
	
});

app.post('/get-data', (req, res) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token == undefined) {
		return false
	} 
	jwt.verify(token, storeData.secretKey, function (err, decoded) {
		console.log(decoded)
		if(decoded === undefined) return false;
		User.findOne({email: decoded.username}, (err, user) => {
			res.json({username: user.username, email: user.email, country: user.country, city: user.city, first_name: user.first_name, last_name: user.last_name, profile_image: user.profile.url});
		})
	});
})

app.post('/user-data', (req, res) => {
	console.log(JSON.stringify(req.body));
	User.findOne({ username: req.body.username }, (err, user) => {
		if(err) return console.log(err);

		console.log(JSON.stringify(user));
		var rootUser;
		jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
			console.log('decoded '+JSON.stringify(decoded))
			if(decoded === undefined) return rootUser = true;
			if(decoded.username === user.email) rootUser = true
			else rootUser = false
		});

		res.json({ 
			avatar: user.profile.url,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email,
			country: user.country,
			city: user.city,
			rootUser: rootUser,
		})
	})
})

app.post('/profile-change', (req, res) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token)
	if(token == undefined) {
		return false
	}

	jwt.verify(token, storeData.secretKey, function(err, decoded) {
		console.log(decoded);
		User.findOne({email: decoded.username}, (err, user) => {
			console.log('fist_name ' + JSON.stringify(req.body));
			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.country = req.body.country;
			user.city = req.body.city;
			user.date = req.body.date;
			user.save(function(err, user) {
				if(err) return console.log(err);
				console.log('user save ' + JSON.stringify(user));
			})

		})
	})
})

app.post('/generate_url', (req, res) => {
	console.log('req '+JSON.stringify(req.body.first_email));
	jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
		console.log('decoded '+JSON.stringify(decoded))
		var data = {
			first_email: req.body.first_email,
			second_email: decoded.username,
		}
		console.log('data ' + JSON.stringify(data));
		var url = jwt.sign(data, storeData.secretKey);
		console.log('url ' + url)
		User.findOne({ email: req.body.first_email }, (err, user) => {
			var email = decoded.username;
			user.message[0].email = url;
			user.save()
		})
		User.findOne({ email: decoded.username }, (err, user) => {
			user.message[0] = url;
			user.save()
			res.json({url: url});
		})
	});
})

module.exports = app;