const mongoose  = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId

    },
    // this defines the object id of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'

    },
    // this defines field is used for defining the type of the liked object since this is a dynamic referencing

    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }},
    {
        timestamps: true
    });

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;