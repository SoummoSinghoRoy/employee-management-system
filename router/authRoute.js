const router = require('express').Router()

const 
  {
    signUpGetController, 
    signUpPostController,
    logInGetController,
    logInPostController
  } = require('../controllers/authController');
const signupValidator = require('../validators/auth/signupValidator');
const loginValidator = require('../validators/auth/loginValidator');

router.get('/signup', signUpGetController);
router.post('/signup', signupValidator, signUpPostController);

router.get('/login', logInGetController);
router.post('/login', loginValidator, logInPostController);

module.exports = router;