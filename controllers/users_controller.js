const User = require('../models/user')

module.exports.profile = function(req, res){
     if(req.cookies.user_id){
            User.findById(req.cookies.user_id, function(err, user){
                if(user){
                    return res.render('profile',{
                        title:"Profile",
                        user:user
                    }); 
                }
                else{
                return res.redirect('/user/sign-in')
                }
            })
     }
     else{
        return res.redirect('/users/sign-in'); 
     }
    
}
// render the sign up and in page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}
module.exports.signIn = function(req, res){
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
// steps to authenticate
//  find the user
 User.findOne({email: req.body.email},function(err, user){
    if(err){console.log('error in finding user in signing in'); return;}
// handel user found
if(user){
 // handel password which dont match
 if(user.password != req.body.password){
    return res.redirect('back');
 }
//  handel session creation
res.cookie('user_id', user.id);
return res.redirect('/users/profile')
}else{
    // handel user not found

    return res.redirect('back');
}
 
 })
}