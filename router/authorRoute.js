const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  authorRegistrationGetController, 
  authorRegistrationPostController
} = require('../controllers/authorController');
const {coverPicUpload} = require('../middlewares/uploadHandle');

router.get('/registration', isAuthenticated, authorRegistrationGetController);
router.post('/registration', isAuthenticated, coverPicUpload.single('coverPic'), authorRegistrationPostController);

router.get('/profile');


module.exports = router;