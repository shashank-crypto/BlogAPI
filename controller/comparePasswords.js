const bcrypt = require('bcrypt');
const saltRounds = 10;

export const comparePasswords = (input,hash) => {
    return new Promise((resolve , reject) =>
        (bcrypt.compare(input, hash, function(err, result) {
            if(err) {reject({"error" : err})}
            if(result) {resolve({"message" : "password verified"})}
            resolve({"message" : "invalid password"});
    })))
}