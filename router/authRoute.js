const router = require('express').Router()
const passport = require('../middlewares/passport');

const 
  {
    signUpGetController, 
    signUpPostController,
    logInGetController,
    logInPostController,
    logOutController
  } = require('../controllers/authController');
const signupValidator = require('../validators/auth/signupValidator');
const loginValidator = require('../validators/auth/loginValidator');

router.get('/signup', signUpGetController);
router.post('/signup', signupValidator, signUpPostController);

router.get('/login', logInGetController);
router.post('/login', loginValidator, logInPostController, passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/auth/login'}));

router.get('/logout', logOutController);

module.exports = router;