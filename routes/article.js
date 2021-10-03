const express = require('express');
let router = express.Router();
const Article = require('../models/Article')
const User = require('../models/User');
const Tag = require('../models/Tag');
const config = require('../config/config');

router.route('/:articleId')
    .get((req,res) => {
        Article.findOne({_id : req.params.articleId})
        .then(doc => {
            if(!doc) res.send('No such post in DB')
            res.send(doc).sendStatus(200)
        })
        .catch(err => res.send({'error' : `you got some error - ${err}`}).sendStatus(400))
    })
    .put([config.auth, config.articleAuth], async (req, res) => {
        if (req.article) {
            const doc = req.article;
            doc.article.content = req.body.content;
            doc.tags = req.body.tags;
            const updatedArticle = await doc.save();
            res.send({
                "message" : "Article updated",
                "doc" : updatedArticle
            })
        }
        else {
            res.send({"error" : "facing issue while posting article"})
        }
    })

router.post('/', config.auth, async (req,res)=>{
    if(req.auth) {
        try{
            const doc = await User.findOne({_id : req.user});
            const article = {
                authorId : doc._id,
                article : {
                    title : req.body.title,
                    content : req.body.content
                },
                tags : req.body.tags
            }
            const newArticle = new Article(article);
            const savedArticle = await newArticle.save();
            doc.Posts._self.push(savedArticle._id);
            await doc.save();
            //restricts the tag numbers to 5(MAX) - frontend
            for(let i=0;i<article.tags.length;i++){
                await Tag.findOneAndUpdate(
                    { tagName : article.tags[i]},
                    { $push : {article : savedArticle._id} },
                    { upsert : true, new : true}
                );
            }
            res.send({"message" : "Article posted", "doc" : savedArticle});
        }
        catch(err){
            res.send({"error" : `Article post request error - ${err}`});
        }
    }
    else {
        res.send({"error" : "Not logged in"});
    }
    //if(localStorage.token) verify(token) get the userId and post the article with authorId = userId
    //if (not verified) redirect to the login page
    //get to know the jwt tokens
})

module.exports = router;