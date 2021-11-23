const express = require('express');
let router = express.Router();
const auth = require('../controller/auth')
const User = require('../models/User')
const comparePasswords = require('../controller/comparePasswords')
const generateToken = require('../controller/generateToken')

router.post('/', auth, async (req,res) => {
    if(!req.auth && (!req.body.username && !req.body.password)) {
        res.send({"error" : "empty boxes"});
        return;
    }

    const user = (req.auth) ? {_id : req.user} : {uname : req.body.username};
    // if(!req.body.username && !req.body.password) res.send({"error" : "empty boxes"})
    try
    {
        const doc = await User.findOne(user);
        if(req.auth && doc) {
            res.send(doc);
        }
        else {
            const result = await comparePasswords(req.body.password, doc.password);
            if(result.message === "password verified") {res.send({"token" : generateToken({user : doc._id}),"doc" : doc})};
        }
    }
    catch(err){
        res.send({'error' : `login error : ${err}`})
    }
    
})

module.exports = router;