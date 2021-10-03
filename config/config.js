const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const env = require('dotenv').config();
const Article = require('../models/Article')

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET /*, { expiresIn : '3m'}*/)
    return token
}

function authenticate(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

const user = {
    user_id : "Heyng"
}

/// taken from app.js
const auth = async (req,res,next) => {
    if(req.headers['authorization']) {
        try{
            // const data = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.TOKEN_SECRET);
            const data = authenticate(req.headers['authorization'].split(' ')[1])
            // console.log(await data.user);
            // const user = await User.findOne({_id : data.user});
            // res.send(await user);
            req.user = await data.user;
            req.auth = true;
        }
        catch(err) {
            console.log(err);
            res.send({"error" : `Error in token authentication - ${err}`})
            next();
        }
    }
    // console.log(req.headers['authorization']);
    // console.log('no takens found. Fill the login form.');
    next();
}

const hashPwd = input => {
    return new Promise((resolve, reject) =>
        (bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) { 
                reject({"error" : `saltError : ${err}`})
            }
            bcrypt.hash(input, salt, function(err, hash) {
                if (err) {
                    reject({"error" : `hashError : ${err}`})
                }
                resolve(hash);
            });
        }))
    )
}

const comparePasswords = (input,hash) => {
    return new Promise((resolve , reject) =>
        (bcrypt.compare(input, hash, function(err, result) {
            if(err) {reject({"error" : err})}
            if(result) {resolve({"message" : "password verified"})}
            resolve({"message" : "invalid password"});
    })))
}

async function saveUser(user) {
    try{
        const hash = await hashPwd(user.password);
        console.log(hash);
        user.password = hash;
        const newUser = new User(user);
        const doc = await newUser.save();
        const token = generateToken({user : await doc._id});
        return {"token" : token, "doc" : doc};
    }
    catch(err){
        console.log(`hadled error : ${err}`)
    }
}

//from article.js
const articleAuth = async (req,res,next) => {
    try{
        if(req.auth) {
            const doc = await Article.findOne({_id :req.params.articleId});
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

// const token = generateToken({user : "Great"})
// console.log(token)
// const res = authenticate(token)
// console.log(res)

module.exports = {generateToken , authenticate , auth , hashPwd , comparePasswords , saveUser , articleAuth}