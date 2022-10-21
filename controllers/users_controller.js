const User = require('../models/user')

module.exports.profile = function(req, res){
    //  if(req.user._id){
        
    //         User.findById(req.user._id, function(err, user){
                
    //             if(user){
    //                 return res.render('profile',{
    //                     title:"Profile",
    //                     user:user
    //                 }); 
    //             }
    //             else{
    //             return res.redirect('/users/sign-in')
    //             }
    //         })
    //  }
    //  else{
    //     return res.redirect('/users/sign-in'); 
    //  }
    // console.log(req.user._id)
    return res.render('profile', {
        title: 'User Profile'
    })
}
// render the sign up and in page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }  
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile')
    }  
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}
// get the sign up data
module.exports.create = function(req, res){
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back')
  }
  User.findOne({email:req.body.email}, function(err, user){
    if(err){console.log('error in finding user in signing up'); return;}
    
    if(!user){
        User.create(req.body, function(err, user){
            if(err){console.log('error in finding user in signing up'); return;}
            return res.redirect('/users/sign-in')
        })
    }
    else{
        return res.redirect('back')
    }
}) 

}
module.exports.createSession = function(req, res){
 return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}