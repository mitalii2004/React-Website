var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const  verifyToken  = require('../middleware/verifyToken').verifyToken;


router.post('/signUp', controllers.userController.signUp)
router.post('/login', controllers.userController.login)
router.post('/logout', verifyToken, controllers.userController.logout)
router.post('/forgotPassword', controllers.userController.forgotPassword)
router.post('/resetPassword', controllers.userController.resetPassword)

module.exports = router; 
