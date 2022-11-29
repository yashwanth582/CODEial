 const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
      }
    ]
},{
    timestamps: true
});
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;