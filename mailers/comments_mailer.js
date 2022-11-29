const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');
console.log('line 2')
// another wqy of exporting a method

exports.newComment = (comment) =>{
    console.log('inside new comment mailer',comment);
    let htmlString = nodemailer.renderTemplete({comment: comment}, '/comments/new_comments')
    nodeMailer.transporter.sendMail({
       
        from: '94818yashwanth@gmail.com',
        to: 'ys1290@srmist.edu.in',
        subject:"New comment published",
        html: '<h1>Yup, your comment is published!</h1>'
    },(err, info)=>{
        if(err){ console.log('Error in sending mail', err);return;}
        console.log('Message sent', info);
        return;
    });
}
// module.exports = newComment;