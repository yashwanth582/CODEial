const express = require('express');
const router  = express.Router();
const passport = require('passport')

const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthenticated, commentsController.create);
// passport.checkAuthentication
module.exports = router;