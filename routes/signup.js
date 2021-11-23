const express = require('express');
let router = express.Router();
const saveUser = require('../controller/saveUser')

router.post('/',(req,res)=>{

    var user = {
        uname : req.body.username,
        name : {
            fname : req.body.first,
            lname : req.body.last
        },
        email : req.body.email,
        password : req.body.password
    };
/// This thing is working now ///

    saveUser(user).then(token => res.send(token))

})

module.exports = router;