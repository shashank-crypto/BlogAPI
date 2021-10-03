const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

console.log(process.env.TOKEN)

const user = {
    name : "Shashank",
    email : "Hello@mail.com",
    password : "hello@123",
    message : "Hey this is token"
}

jwt.sign({user},'mySecret',{expiresIn : '3m'},(err,result)=>{
    console.log(result)
})

jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJ1c2VyIjp7Im5hbWUiOiJTaGFzaGFuayIsImVtYWlsIjoiSGVsbG9AbWFpbC5jb20iLCJwYXNzd29yZCI6ImhlbGxvQDEyMyIsIm1lc3NhZ2UiOiJIZXkgdGhpcyBpcyB0b2tlbiJ9LCJpYXQiOjE2MzI4MjgyMTYsImV4cCI6MTYzMjgyODM5Nn0.HLNN_N75jMadnFEN59khEfuWpbsbHMSNujgaLpcW6GY" , 'mySecret' , (e,d)=>console.log(d))
// const hashPwd = input => {
//     return new Promise((resolve, reject) =>
//         (bcrypt.genSalt(saltRounds, function(err, salt) {
//             if(err) { 
//                 reject(`saltError: ${err}`)
//             }
//             bcrypt.hash(input, salt, function(err, hash) {
//                 if (err) {
//                     reject(`hashError: ${err}`)
//                 }
//                 resolve(hash);
//             });
//         }))
//     )
// }

// const comparePasswords = (input,hash) => {
//     return new Promise((resolve , reject) =>
//         (bcrypt.compare(input, hash, function(err, result) {
//             if(err) {reject({"error" : err})}
//             if(result) {resolve({"message" : "verified"})}
//             resolve({"message" : "invalid password"});
//     })))
// }

// hashPwd('great').then(result => console.log(result))

// comparePasswords('Password', '$2b$10$nP89kCU.p0bT0gNiBBcS0uwpPMiscuLb2C4yNNk5F/rLVK9XlVOhC')
// .then(message => {console.log(message.message); throw new Error('lets try an error')})
// .catch(error => console.log(error))