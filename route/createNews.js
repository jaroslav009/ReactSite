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

app.get('/general-news', (req,res) => {
    News.find({}, (err, news) => {
        if(err) return console.error(err);
        console.log('news ' + JSON.stringify(news));
        res.json({
            news
        });
    })
})

module.exports = app;