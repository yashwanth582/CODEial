const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("Invalid username/password");
            return done(null, false);
        }
        return done(null, user);
    });
}
));

// serialize user function
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//deserialize the user fn
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
        console.log("Error in finding user --> passport");
        return done(err);
    }
    return done(null, user);
  }); 
});
// check if user is authenticated
passport.checkAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains current signed in user data from the login page
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;