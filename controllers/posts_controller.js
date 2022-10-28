const Post = require('../models/post')
const Comment  = require('../models/comment')
module.exports.create = async function(req, res){
// console.log(req.user._id);
try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
         
    }); 
    // xhr xml http request
    if(req.xhr){
        // 200 is success code
        return res.status(200).json({
            data:{
                post: post
            },
            message: "Post Created!"
        });
    }
    req.flash('success', 'Post Published')      
    return res.redirect('back');
}  catch(err){
    req.flash('error', err)
    return res.redirect('back');
} 
 
    
}

module.exports.destroy = async function(req, res){
// post in below fundtion is in models/post.js/ there is feature user:{} and there post is stored
        try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
           if(req.xhr){
            return res.status(200, json({
                data: {
                    post_id : req.params.id
                },
                message: "Post deleted successfully."
            }))
           }
            req.flash('success', 'Post associated and comments deleted')      

            return res.redirect('back')
        } else{
            req.flash('error', 'You cannot delete this post')      

            return res.redirect('back')
        }
        }
        catch(err){
            req.flash('error', err)
            return res.redirect('back');
        } 
}