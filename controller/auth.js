const authenticate = require('./authenticate')

export const auth = async (req,res,next) => {
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