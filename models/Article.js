const mongoose = require('mongoose');

const Article = new mongoose.Schema({
    authorId : {
        type : String,
        required :true,
        default : "anonymous"
    },
    article : {
        title : {
            type : String,
            required : true
        },
        content : {
            type : [String],
            required : true
        },
        imgFiles : [String]
    },
    like : {
        type : Number,
        default : 0
    },
    starred : {
        type : Number,
        default : 0
    },
    comments : Number, //Don't need it though as we can always have comments.length
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    tags : [String],
    comments : [{
        authorId : String,
        comment : String
    }]
})

module.exports = mongoose.model('Article', Article);