const mongoose = require('mongoose');

const User = new mongoose.Schema({
    uname : {
        type : String,
        required : [true , "It's the username"],
        unique: true
    },
    name : {
        fname : {
            type : String,
            required : true
        },
        lname : {
            type : String,
            required : true
        }
    },
    email : {
        type : String,
        required : true,
        unique : [true, 'already there']
    },
    password : {
        type : String,
        required : true
    },
    Posts : {
        _self : [String],
        liked : [String],
        starred : [String]
    },
    tags : {
        recent : [String],
        liked : [String]
    }
})

module.exports = mongoose.model('User', User)