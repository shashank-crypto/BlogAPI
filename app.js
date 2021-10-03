const express = require('express');
const mongoose = require('mongoose');
const app = express();
const env = require('dotenv').config();
const port = 3000;
const User = require('./models/User');
const config = require('./config/config');
const article = require('./routes/article')

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//middlewares - cors(), morgan(), gzip-compression() for compresses requests, https()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

app.use("/article", article)

app.get('/', (req,res) => {
    // User.findOne({uname : "shashank.k"}).then(doc=>{if(doc) res.send(doc); else console.log('done')}).catch(err =>{console.log(err)})
    //Check for tokens in localStorage - if present send an authenticated nod
                                    //   else give a login/signup page
})

app.post('/', (req,res)=>{
    // User.findOne({uname : "shasank.k"}).then(doc=>{if(doc) res.send(doc); else res.send('done');console.log('done')}).catch(err =>{console.log(err)})
})

app.post('/login', config.auth, async (req,res) => {
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
            const result = await config.comparePasswords(req.body.password, doc.password);
            if(result.message === "password verified") {res.send({"token" : config.generateToken({user : doc._id}),"doc" : doc})};
        }
    }
    catch(err){
        res.send({'error' : `login error : ${err}`})
    }
    
})

app.post('/signup',(req,res)=>{

    var user = {
        uname : req.body.username,
        // uname : req.body.username,
        name : {
            fname : req.body.first,
            lname : req.body.last
        },
        email : req.body.email,
        password : req.body.password
    };

/// This thing is working now ///

    config.saveUser(user).then(token => res.send(token))

})

app.listen(port, ()=>{console.log(`Server running at port ${port}`)});