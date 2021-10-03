const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
    tagName : String,
    article : [String]
})

module.exports = mongoose.model('Tag', Tag);