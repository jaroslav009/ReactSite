const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
// Include MongoDB
const News = require('../models/schemaNews');

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

app.post('/create-news', (req, res) => {
    console.log('hello world ' + req.body.title)
    // News.create({
    //     title: req.body.title,
    //     longDescription: req.body.longDescription,
    //     shortDescription: req.body.shortDescription
    // }, (err, doc) => {
    //     if(err) return console.log(`err ${err}`);
    //     console.log(`Success save news ${doc}`);
    // })
    res.json({
        hello: 'world'
    })
})

app.post('/img-news', upload.single('image'), (req, res) => {
    console.log('avatar ' + JSON.stringify(req.file))
})

module.exports = app;