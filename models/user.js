const mongoose = require('mongoose');
const multer = require('multer');
const path  = require('path');
const AVATHAR_PATH =  path.join('/uploads/users/avatars')
const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    avatar:{
        type: String
    }
     
}, {
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        // dirname is current file, dot dot .. represents two steps back then we can find avathar_path which we have imported in the starting of the file
        cb(null, path.join(__dirname, '..', AVATHAR_PATH));
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
});
// static 
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
// in above function at last we wrote (.single('avatar')) because we are only uploading single file and type is avatar 
userSchema.statics.avatarPath = AVATHAR_PATH;
const user = mongoose.model('user', userSchema);
module.exports = user;