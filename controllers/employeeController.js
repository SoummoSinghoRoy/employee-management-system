const db = require('../models/index');
let Employee = db.employee;
const Department = db.department;

exports.employeeRegistrationGetController = async (req, res, next) => {
  try {
    const departmentList = await Department.findAll({raw: true})
    return res.render('pages/employee/registration.ejs', {
      title: "Employee Registration",
      error: null,
      departmentList
    })
  } catch (error) {
    next(error)
  }
}

exports.employeeRegistrationPostController = async (req, res, next) => {
  let { fullName, departmnet, joiningDate, email, contactNo, street, city, district, country } = req.body
  console.log(req.body);
  try {
  } catch (error) {
    next(error)
  }
}