var express = require('express');
var router = express.Router();

const passport = require('passport')
router.use(passport.initialize());
router.use(passport.session());

const controllers = require('../controllers/index')
const verifyToken = require('../middleware/verifyToken').verifyToken;

router.post('/signUp', controllers.userController.signUp)
router.post('/otpVerify', controllers.userController.otpVerify)
// router.post('/resendOtp', controllers.userController.resendOtp)
router.post('/login', controllers.userController.login)
router.post('/logout', verifyToken, controllers.userController.logout)
router.post('/forgotPassword', controllers.userController.forgotPassword)
router.get('/resetPassword', controllers.userController.resetPassword)
router.post('/changePassword', controllers.userController.changePassword)
router.post('/resendForgotPasswordLink', controllers.userController.resendForgotPasswordLink)

router.get('/loadAuth', controllers.userController.loadAuth);
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/failure',
    }),
    (req, res) => {
        res.redirect(`http://localhost:5173`);
    }
);
router.get('/success', controllers.userController.successGoogleLogin);
router.get('/failure', controllers.userController.failureGoogleLogin);

module.exports = router; 
