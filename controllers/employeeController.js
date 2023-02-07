const db = require('../models/index');
let Employee = db.employee;

exports.employeeRegistrationGetController = (req, res, next) => {
  return res.render('pages/employee/registration.ejs', {
    title: "Employee Registration",
    error: null
  })
}

exports.employeeRegistrationPostController = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
}