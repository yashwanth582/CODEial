 const Post = require('../models/post');
//  const user = require('../models/user');

const User = require('../models/user');
module.exports.home = function(req, res){
  // console.log(req.cookies)
  // res.cookies('user_id',25) 
  // Post.find({}, function(err, posts){
  //   return res.render('home',{
  //     title:"Codeial | Home",
  //     posts: posts
  //   });
  // })
  Post.find({})
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user'
    }
  })
  .exec(function(err, posts){
    if(err){
      console.log(err);
    }
    User.find({}, function(err, users){
      return res.render('home',{
        title:"Codeial | Home",
        posts: posts,
        all_users:users
      });
    })
})
}
// all the things like title , posts, all_users can be accessible from views