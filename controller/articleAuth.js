const Article = require('../models/Article')

export const articleAuth = async (req,res,next) => {
    try{
        if(req.auth) {
            const doc = await Article.findById(req.params.articleId);
            console.log(`doc : ${doc}, auth : ${req.auth}, user : ${req.user}`)
            if(doc.authorId == req.user) {
                req.article = doc;
                next();
            }
            else {
                res.send({"error" : "Not authorized"})
            }
        }
        else {
            res.send({"error" : "Not logged in"})
        }
    }catch(err)
    {
        res.send({"error" : `Caught in ArticleAuth - ${err}`})
    }
}