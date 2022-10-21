const express = require('express')

const router = express.Router();
const homeController  = require('../controllers/home_controller')
console.log('router loaded');
// router is accessing home object from home controllers in controllers
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments'));
router.use('/comments', require('./comments'))
module.exports = router;