const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
// Include Schema MongoDB
const News = require('../models/schemaNews');
const User = require('../models/schema');

const storeData = require('./storeData');

var app = express();

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

app.post('/create-news', upload.single('image'), (req, res) => {
    console.log('hello world ' + JSON.stringify(req.file))
    jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
        console.log('decoded' + JSON.stringify(decoded))
        if(decoded === undefined) return false;
        var rand = jwt.sign({
            id: decoded.username,
        }, storeData.secretKey);
        var img_url = "";
        cloudinary.uploader.upload(req.file.path, function(result) {
            console.log('result from cloudinary ', result.url)

            News.create({
                title: req.body.title,
                longDescription: req.body.longDescription,
                shortDescription: req.body.shortDescription,
                email: decoded.username,
                idNews: rand,
                img_url: result.url
            }, (err, doc) => {
                if(err) return console.log(`err ${err}`);
                console.log(`Success save news ${doc}`);
            })
            User.findOne({ email: decoded.username }, (err, user) => {
                if(err) return console.log(err);
                if(!user) return res.json({ err: 'not exist user' });
                var leng = user.news.length;
                user.news[leng] = {
                    idNews: rand
                };
                user.save((err, user) => {
                    if(err) return console.log(err);
                })
            })
        })
        console.log('img url: ' + img_url);
        
        res.json({
            idNews: rand
        })
    });
    
})

app.post('/img-news', upload.single('image'), (req, res) => {
    console.log('avatar ' + JSON.stringify(req.body.idNews))
    // cloudinary.uploader.upload(req.file.path, function(result) {
    jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
        if(err) return console.log(err);
        User.findOne({email: decoded.username}, (err, user) => {
            if(err) return console.log(err);
            if(!user) return console.log('not exist user');
        })
    })
    cloudinary.uploader.upload(req.file.path, function(result) {
        console.log('result from cloudinary ', JSON.stringify(result))
        News.find({}, (err, res) => {
            console.log('res from News ' + JSON.stringify(typeof(res[0])));
            // console.log('found element ', find(res, req.body.idNews))
        })
    })
	// 	jwt.verify(req.body.token, storeData.secretKey, function (err, decoded) {
	// 		console.log(decoded)
	// 		if(decoded === undefined) return false;
	// 		console.log(result)
	// 		User.findOne({ email: decoded.username }, (err, user) => {
	// 			if(err) return console.log(err);
	// 			if(!user) return res.json({ err: 'not exist user' });
	// 			console.log(JSON.stringify('result.url ' + result.url));

	// 			cloudinary.v2.uploader.destroy(user.profile.name, function(error, result){console.log('result '+JSON.stringify(result))});

	// 			user.profile.url = result.url;
	// 			user.profile.name = result.public_id;

	// 			user.save(function(err, user) {
	// 				if(err) return console.log(err);
	// 				console.log('user save ' + JSON.stringify(user.profile));
	// 				res.json({image: user.profile.url, image_name: user.profile.name})
	// 			})
	// 		})
	// 	});

    // });
    res.json({hello: 'world'})
})

module.exports = app;