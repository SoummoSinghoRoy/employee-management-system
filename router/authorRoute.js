const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  authorRegistrationGetController
} = require('../controllers/authorController');

router.get('/registration', isAuthenticated, authorRegistrationGetController);
router.post('/registration');

router.get('/profile');


module.exports = router;