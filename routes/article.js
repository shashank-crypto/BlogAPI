const express = require('express');
let router = express.Router();
const Article = require('../models/Article')
const User = require('../models/User');
const Tag = require('../models/Tag');
// const config = require('../controller/config');
const auth = require('../controller/auth')
const articleAuth = require('../controller/articleAuth')

router.route('/:articleId')
    .get((req,res) => {
        Article.findById(req.params.articleId)
        .then(doc => {
            if(!doc) throw new Error("No such article present")
            res.send(doc)
        })
        .catch(err => res.status(404).send({'error' : `you got some error - ${err}`}))
    })
    .put([auth, articleAuth], async (req, res) => {
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

router.post('/:articleId/star',auth, async (req,res)=>{
    if(req.auth){
        /*User.findById(req.user)
        .then(doc => {if(doc.Posts.liked.includes(req.params.articleId)); return;})
        Article.findById(req.params.articleId)
        .then(doc => {doc.starred++; doc.save()})
        .then(doc => res.send({"message" : "You starred the post"}))
        .catch(err => res.send({"error" :  `got an error - ${err}`}) )*/
        try{
            const loggedUser = await User.findById(req.user);
            if(loggedUser.Posts.starred.includes(req.params.articleId)){
                res.send({"message" : "You already starred it once"});
                return
            }
            loggedUser.Posts.starred.push(req.params.articleId)
            const article = await Article.findById(req.params.articleId);
            article.starred++
            await loggedUser.save()
            await article.save()
            res.send({"message" : "You starred the post"})
        }catch(err){
            res.send({"error" : `You got an error when trying to star the post ${err}`})
        }
    }
    else{
        res.send({"error" : "Not logged in"})
    }
})

router.post('/:articleId/like',auth, async (req,res)=>{
    if(req.auth){
        /*Article.findById(req.params.articleId)
        .then(doc => {doc.like++; doc.save()})
        .then(doc => res.send({"message" : "You liked the post"}))
        .catch(err => res.send({"error": `got an error - ${err}`}))*/
        try{
            const loggedUser = await User.findById(req.user);
            if(loggedUser.Posts.liked.includes(req.params.articleId)){
                res.send({"message" : "You already liked it once"});
                return
            }
            loggedUser.Posts.liked.push(req.params.articleId)
            const article = await Article.findById(req.params.articleId);
            article.like++
            await loggedUser.save()
            await article.save()
            res.send({"message" : "You Liked the post"})
        }catch(err){
            res.send({"error" : `You got an error when trying to star the post ${err}`})
        }
    }
    else{
        res.send({"error" : "Not logged in"})
    }
})

router.post('/:articleId/comment' ,auth, async (req,res) => {
    try{
        if(req.auth){
            const doc = await Article.findById(req.params.articleId);
            const comment = {
                authorId : req.user,
                comment : req.body.comment
            };
            doc.comments.push(comment);
            await doc.save();
            res.send(comment)
        }
        else {
            res.send({"error" : "Not logged in"})
        }
    }catch(err) {
        res.send({"error" : `Can't comment because ${err}`})
    }
})

router.post('/', auth, async (req,res)=>{
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