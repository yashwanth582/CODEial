const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "932000036472-b2joq33s7l2p2acep4e92pu787bhlo4n.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
function(accessTocken, refreshToken, profile, done){
    // find a user 
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){ console.log('error in google strategy-passport', err); return;}
       console.log(accessTocken, refreshToken);
        console.log(profile);
        // if found , set this user as req.user
        if(user){
            return done(null, user);
        }
        //if not found, create the user and set it as req.user 
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){ console.log('error in creating user google strategy-passport', err); return;}
                return done(null, user);
            })
        }
    })
}
))
module.exports = passport;