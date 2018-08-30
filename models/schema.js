const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
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
