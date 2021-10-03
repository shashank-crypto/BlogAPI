## Comparing passwords with hash
    const comparePasswords = (input,hash) => {
        bcrypt.compare(input, hash, function(err, result) {
            if(err) return {"error" : err};
            if(result) return {"message" : "verified"};
            return {"message" : "invalid password"}
        })
    }


## Generating password hash
    const hashPwd = input => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) { 
                console.log(`You got an error when Hashing passwor during saltGeneration ${err}`);
                return;
            }
            bcrypt.hash(input, salt, function(err, hash) {
                if (err) {
                    console.log(`hashing password error : ${err}`);
                    return
                }
                return hash;
            });
        });
    }

## Authentication using .then,.catch
    const auth = (username, password)=>{
        User.findOne({uname : username})
        .then(doc => {if(doc) comparePasswords(password, doc.password)})
        .then(response => console.log(response))
        .catch(err => {return {"error" : err}})
    }

## Sync version of **Async saveUser**

    hashPwd(req.body.password)
    .then(hash => {
        user.password = hash;
        console.log(hash);
        return new User(user);
    })
    .save()
    .then(payload =>{
        const token = config.generateToken(payload);
        console.log('saved');
        res.json({Token : token});
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })

## sync version of **Login**

    User.findOne({uname : user})
    .then(doc => {
        if(doc) return doc;
        throw new Error('You are not in our DB');
    })
    // .then(doc => {console.log(`${req.body.password}+${doc.password}`); return doc;})
    .then(doc => {
        if(user.auth) {res.send(doc); return {'message' : 'token verified'}}
        else comparePasswords(req.body.password , doc.password)
    })
    .then(mss => res.send(mss.message))
    .catch(err => console.log(err))

## Extra- Extra
    const newUser = new User(user);

    newUser.save()
    .then(() => {console.log('saved'); res.sendStatus(200)})
    .catch(err => {console.log(err); res.sendStatus(400)});

## Issues :

Not consistent handling error<br>
Middlewares sending responses<br>

# Ideas for extra

cookies in api<br>
authentication using API<br>
socket in APIs (opening socket in OS)<br>
ReactJS<br>
passport (authentication)<br>
Handling errors using middleware<br>


    (Don't worry about saving the token)- just send it
            |           (Token && Refresh Token)
            \/
    HANDLED BY THE FRONTEND (REMEMBER ME)


keep log of the activities - login, logout, like<br>

dates are important<br>

<input type="checkbox"/>Using upsert for tags<br>
- Check if the tag is available
- if yes - push the `_id` of the article into the tagArray
- if no create one and push the `_id` into the newArray

## Tests Done for API

signup<br>
login<br>
generatingTokens and its working<br>
article - get (anyone)<br>
article - update (proper authorization) <br>
article - post (authentication) <br>

## Another work

Data Structure and Algorithm;<br>
Networking;<br>
Computer Architecture;<br>
Operating System;<br>
DBMS;<br>