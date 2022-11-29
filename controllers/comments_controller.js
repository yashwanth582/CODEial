const Comment  = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer')
module.exports.create = async function(req, res){
    //req.body.post here post we'll be getting this from home.ejs in forms input  
   
   try{
    let post = await Post.findById(req.body.post);
    if(post){
       let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }) 
            // handel error
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
           
            commentsMailer.newComment(comment);
            console.log('try done')
             
            if (req.xhr){
                // xml http request
                // Similar for comments to fetch the user's id!
     
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            req.flash('success', 'Comment successfully added')      
            res.redirect('/');
        }
   }catch(err){
    req.flash('error', 'Comment cannot be deleted')      
    res.redirect('/');

     
   }
    
        
    
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

        let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}) 
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

             // send the comment id which was deleted back to the views
             if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

        req.flash('success', 'Comment successfully deleted')      
    
        return res.redirect('back');
            
        }else{
            req.flash('error', 'You cannot delete this comment')      

            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', 'You cannot delete this comment')      
        return res.redirect('back');

    }
}