const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    // News begin
    title: String,
    longDescription: String,
    shortDescription: String,
    idNews: String,
    email: String,
    img_url: String,
    // News end
});

var News = mongoose.model("News", userSchema);

userSchema.plugin(passportLocalMongoose);

module.exports = News
