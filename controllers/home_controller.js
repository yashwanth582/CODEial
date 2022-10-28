 const Post = require('../models/post');
//  const user = require('../models/user');

const User = require('../models/user');

module.exports.home = async function(req, res){
   try{
    let posts = await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user'
    }
  });
   
  let users = await User.find({});
  return res.render('home',{
    title:"Codeial | Home",
    posts: posts,
    all_users:users
  });
   }catch(err){
      console.log('error', err);
     }
   
}
// all the things like title , posts, all_users can be accessible from views