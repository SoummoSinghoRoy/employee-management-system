const router = require('express').Router()

const 
  {
    signUpGetController, 
    signUpPostController
  } = require('../controllers/authController');
const signupValidator = require('../validators/auth/signupValidator');

router.get('/signup', signUpGetController);
router.post('/signup', signupValidator, signUpPostController);

module.exports = router;