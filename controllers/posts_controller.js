const Post = require('../models/post')
const Comment  = require('../models/comment')
module.exports.create = function(req, res){
// console.log(req.user._id);
    Post.create({
        content: req.body.content,
        user: req.user._id
         
    }, function(err, post){
        if(err){
            console.log('Error in creating a post');return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){
// post in below fundtion is in models/post.js/ there is feature user:{} and there post is stored
   
Post.findById(req.params.id, function(err, post){
    //   _id instead of writing this we should write req.id ...  mongoose directly converts it into string
      
    if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back')
            })
        } else{
            return res.redirect('back')
        }
        
    })
}