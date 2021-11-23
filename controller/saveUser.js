const hashPwd = require('./hashPwd')
const generateToken = require('./generateToken')
const User = require('../models/User')


export async function saveUser(user) {
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
