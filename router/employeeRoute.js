const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/authentication');
const {
  employeeRegistrationGetController, 
  employeeRegistrationPostController,
  getAllEmployeeController,
  singleEmployeeProfileController,
  employeeEditGetController,
  employeeEditPostController,
  employeeDeleteController,
} = require('../controllers/employeeController');
const {employeePicUpload} = require('../middlewares/uploadHandle');
const upload = employeePicUpload.single('profilePic');
const registrationValidator = require('../validators/employee/registrationValidator');
const db = require('../models/index');
const Department = db.department;
const editEmployeeValidator = require('../validators/employee/editEmployeeValidator');
const Employee = db.employee;

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
      next()
    }
  })
}

const updateFileUpload = async (req, res, next) => {
  const { employeeId } = req.params
  const employeeData = await Employee.findOne({ where: { id : employeeId }});
  const employee = JSON.parse(JSON.stringify(employeeData))
  const departmentList = await Department.findAll({raw: true})

  upload(req, res, (err) => {
    if(err) {
      res.render('pages/employee/editEmployee.ejs', {
        title: `${employee.fullName} | edit profile`,
        errorMsgs: ['Attachment must be less than 200kb'],
        departmentList,
        employee,
      }) 
    } else {
      next()
    }
  })
}

router.get('/', isAuthenticated, getAllEmployeeController)
router.get('/registration', isAuthenticated, employeeRegistrationGetController);
router.post('/registration', isAuthenticated, fileUpload, registrationValidator, employeeRegistrationPostController);

router.get('/profile/:employeeId', isAuthenticated, singleEmployeeProfileController);

router.get('/edit/:employeeId', isAuthenticated, employeeEditGetController);
router.post('/edit/:employeeId', isAuthenticated, updateFileUpload, editEmployeeValidator, employeeEditPostController);

router.get('/delete/:employeeId', isAuthenticated, employeeDeleteController);

module.exports = router;