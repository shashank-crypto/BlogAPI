const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPwd = input => {
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