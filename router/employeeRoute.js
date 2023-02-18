const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  employeeRegistrationGetController, 
  employeeRegistrationPostController,
  getAllEmployeeController,
  singleEmployeeProfileController,
  employeeEditGetController
} = require('../controllers/employeeController');
const {employeePicUpload} = require('../middlewares/uploadHandle');
const upload = employeePicUpload.single('profilePic');
const registrationValidator = require('../validators/employee/registrationValidator');
const db = require('../models/index');
const Department = db.department;

const fileUpload = async (req, res, next) => {
  const departmentList = await Department.findAll({raw: true})

  upload(req, res, (err) => {
    if(err) {
      return res.render('pages/employee/registration.ejs', {
        title: "Employee Registration",
        errorMsgs: ['Attachment must be less than 200kb'],
        departmentList
      })
    } else {
      console.log(req.file);
      next()
    }
  })
}

router.get('/', isAuthenticated, getAllEmployeeController)
router.get('/registration', isAuthenticated, employeeRegistrationGetController);
router.post('/registration', isAuthenticated, fileUpload, registrationValidator, employeeRegistrationPostController);

router.get('/profile/:employeeId', isAuthenticated, singleEmployeeProfileController);

router.get('/edit/:employeeId', isAuthenticated, employeeEditGetController);


module.exports = router;