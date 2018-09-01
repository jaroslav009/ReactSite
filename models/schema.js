const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    // News begin
    title: String,
    longDescription: String,
    shortDescription: String,
    // News end
    hash: String,
    salt: String,
    uid: String,
    active: Number,
    created: {
        type: Date,
        default: Date.now
    },
    profile: {
        name: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    date: String,
    message: [
        
    ]
});

var User = mongoose.model("User", userSchema);

userSchema.plugin(passportLocalMongoose);

module.exports = User
