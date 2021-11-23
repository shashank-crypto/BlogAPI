const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
// const compression = require('compression');
const env = require('dotenv').config()
const port = 3000

const article = require('./routes/article')
const login = require('./routes/login')
const signup = require('./routes/signup')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// app.use(compression());

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
app.use("/signup", signup)
app.use("/login", login)

app.get('/', (req,res) => {
    // User.findOne({uname : "shashank.k"}).then(doc=>{if(doc) res.send(doc); else console.log('done')}).catch(err =>{console.log(err)})
    //Check for tokens in localStorage - if present send an authenticated nod
                                    //   else give a login/signup page
})

app.post('/', (req,res)=>{
    // User.findOne({uname : "shasank.k"}).then(doc=>{if(doc) res.send(doc); else res.send('done');console.log('done')}).catch(err =>{console.log(err)})
})


app.listen(port, ()=>{console.log(`Server running at port ${port}`)});