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
    like : Number,
    starred : Number,
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    tags : [String]
})

module.exports = mongoose.model('Article', Article);