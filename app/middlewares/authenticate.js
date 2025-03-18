var passport = require('passport');
require('./passport');
module.exports = function(req,res,next){
    passport.authenticate('jwt', function (err, user) {

        if(err) return res.status(500).json({status : 500, success : false , message : err.message});
        if (!user) return res.status(401).json({status: 401, success : false, error:"You are not an authorized user!"});
        next();
    
    })(req,res,next);
}