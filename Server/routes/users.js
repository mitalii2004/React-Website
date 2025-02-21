var express = require('express');
var router = express.Router();
const controllers = require('../controllers/index')
const  verifyToken  = require('../middleware/verifyToken').verifyToken;

router.post('/signUp', controllers.userController.signUp)
router.post('/login', controllers.userController.login)
router.post('/logout', verifyToken, controllers.userController.logout)
router.post('/forgotPassword', controllers.userController.forgotPassword)
router.get('/resetPassword', controllers.userController.resetPassword)
router.post('/changePassword',controllers.userController.changePassword)
router.post('/resendForgotPasswordLink',controllers.userController.resendForgotPasswordLink)

module.exports = router; 
