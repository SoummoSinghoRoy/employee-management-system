const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  employeeRegistrationGetController, 
  employeeRegistrationPostController
} = require('../controllers/employeeController');
const { employeePicUpload } = require('../middlewares/uploadHandle');

router.get('/registration', isAuthenticated, employeeRegistrationGetController);
router.post('/registration', isAuthenticated, employeePicUpload.single(''), employeeRegistrationPostController);

router.get('/profile');


module.exports = router;