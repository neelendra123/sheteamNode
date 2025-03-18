const Users = require("../models/users");
var passport = require('passport');
// const {to,TE} = require('../middlewares/utilservices');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "5876E8aZX7f6b0Rd72eA7185dC08als8hh2y";
 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    let err;
  let users =  Users.findOne({id: jwt_payload._id});
    
        if (err) {
             return done(err, false);
        }
        if (users) {
            return done(null, users);
        } else {
            return done(null, false);
           
        }
}));
// var authenticate = passport.authenticate('jwt', { session: false });

// (req, res, next);

