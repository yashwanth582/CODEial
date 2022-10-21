const Comment  = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //req.body.post here post we'll be getting this from home.ejs in forms input  
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handel error
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    });
}