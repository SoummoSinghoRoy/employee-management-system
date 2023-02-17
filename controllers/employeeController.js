const {validationResult} = require('express-validator');

const db = require('../models/index');
let Employee = db.employee;
const Department = db.department;

exports.employeeRegistrationGetController = async (req, res, next) => {
  try {
    const departmentList = await Department.findAll({raw: true})
    return res.render('pages/employee/registration.ejs', {
      title: "Employee Registration",
      errorMsgs: [],
      departmentList
    })
  } catch (error) {
    next(error)
  }
}

exports.employeeRegistrationPostController = async (req, res, next) => {
  let { fullName, department, role, salary, joiningDate, nid_no, education, email, contactNo, dateOfBirth, gender, present_street, present_city, present_district, present_country, permanent_street, permanent_city, permanent_district, permanent_country } = req.body

  const errors = validationResult(req).formatWith(err => err.msg)
  const errorMsgs = errors.array()
  const departmentList = await Department.findAll({raw: true})

  if(req.file) {
    const proficePicUpload = `/uploads/employee/${req.file.filename}`
    const errors = validationResult(req).formatWith(err => err.msg)
    const errorMsgs = errors.array()

    if(!errors.isEmpty()) {     
      return res.render('pages/employee/registration.ejs', {
        title: "Employee Registration",
        errorMsgs,
        departmentList
      })
    }

    try {
      const dpId = parseInt(department)
      const departmentName = await Department.findOne({where: {id: dpId}})
      const employeeDepartment = departmentName
      
      const employee = await Employee.create({
        fullName,
        role,
        salary,
        joiningDate,
        email,
        contactNo,
        nid_no,
        education,
        dateOfBirth,
        gender,
        present_street,
        present_city,
        present_district,
        present_country,
        permanent_street,
        permanent_city,
        permanent_district,
        permanent_country,
        profilePic: proficePicUpload  
      })
      await employee.setDepartment(employeeDepartment)
      res.redirect('/employee')
    } catch (error) {
      next(error)
    }
  }else {
    if(!errors.isEmpty()) {
      const departmentList = await Department.findAll({raw: true})
      errorMsgs.push([`Must attach a valid picture`])
      return res.render('pages/employee/registration.ejs', {
        title: "Employee Registration",
        errorMsgs,
        departmentList
      })
    }
  }
}

exports.getAllEmployeeController = async (req, res, next) => {
  try {
    let employees = []
      const allEmployees = await Employee.findAll({include: Department})
      allEmployees.map((employee) => {
      const parsedEmployee = JSON.parse(JSON.stringify(employee))
      employees.push(parsedEmployee)
    });
    res.render('../views/pages/employee/allEmployee.ejs', {
      title: 'All employee list',
      employees
    })
  } catch (error) {
    next(error)
  }
}

exports.singleEmployeeProfileController = async (req, res, next) => {
  const {employeeId} = req.params;
  
  try {
    const employeeData = await Employee.findOne({
      where: {
        id: employeeId
      },
      include: Department
    })
    const employee = JSON.parse(JSON.stringify(employeeData))
    res.render('../views/pages/employee/profile.ejs', {
      title: `${employee.fullName} profile`,
      employee
    })
  } catch (error) {
    next(error)
  }
}