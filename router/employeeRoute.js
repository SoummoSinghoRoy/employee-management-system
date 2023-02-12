const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  employeeRegistrationGetController, 
  employeeRegistrationPostController,
  getAllEmployeeController
} = require('../controllers/employeeController');
const { employeePicUpload } = require('../middlewares/uploadHandle');
const registrationValidator = require('../validators/employee/registrationValidator');


router.get('/', isAuthenticated, getAllEmployeeController)
router.get('/registration', isAuthenticated, employeeRegistrationGetController);
router.post('/registration', isAuthenticated, employeePicUpload.single('profilePic'), registrationValidator, employeeRegistrationPostController);

router.get('/profile');


module.exports = router;