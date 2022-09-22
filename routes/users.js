const express = require('express')
const router  = express.Router();

const usersController =  require('../controllers/users_controller');

router.get('/profile', usersController.profile)
 
// we are using users_controller.js file by importing
module.exports = router;