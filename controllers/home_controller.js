 const Post = require('../models/post');
//  const user = require('../models/user');
 module.exports.home = function(req, res){
  // console.log(req.cookies)
  // res.cookies('user_id',25) 
  // Post.find({}, function(err, posts){
  //   return res.render('home',{
  //     title:"Codeial | Home",
  //     posts: posts
  //   });
  // })
  Post.find({}).populate('user').exec(function(err, posts){
    if(err){
      console.log(err);
    }
    return res.render('home',{
      title:"Codeial | Home",
      posts: posts
    });
    
  })
    

}