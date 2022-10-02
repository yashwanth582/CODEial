const express = require('express')
const router  = express.Router();

const usersController =  require('../controllers/users_controller');
 
router.get('/profile', usersController.profile)
 
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
// in above all codes after get('/sign-up') means when we type the keyword sign-up in the browser we need to render the folllowing page which is userController.signUp
// we are using users_controller.js file by importing
router.post('/create', usersController.create);
router.post('/create-session',usersController.createSession)
// above line post create-session is forms action in user_sign_in.ejs file - when we submit the data of the form the post method is invoked  
module.exports = router;
