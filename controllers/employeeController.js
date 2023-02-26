const {validationResult} = require('express-validator');
const fs = require('fs')

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
  const { page } = req.query

  const currentPage = parseInt(page) || 1
  const employeePerPage = 50
  try {
    let employees = []
    const allEmployees = await Employee.findAndCountAll({
      include: Department,
      limit: employeePerPage,
      offset: (currentPage * employeePerPage) - employeePerPage
    })

    allEmployees.rows.map((employee) => {
      const parsedEmployee = JSON.parse(JSON.stringify(employee))
      employees.push(parsedEmployee)
    });
    if(allEmployees.length !== 0) {
      res.render('../views/pages/employee/allEmployee.ejs', {
        title: 'All employee list',
        employees,
        currentPage,
        employeePerPage,
        totalPage: allEmployees.count / employeePerPage
      })
    } else {
      res.redirect('/employee/registration')
    }
    
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

exports.employeeEditGetController = async (req, res, next) => {
  const { employeeId } = req.params
  try {
    const departmentList = await Department.findAll({raw: true})
    const employeeData = await Employee.findOne({ 
      where: { id : employeeId },
      include: Department
    });
    const employee = JSON.parse(JSON.stringify(employeeData))

    res.render('pages/employee/editEmployee.ejs', {
      title: `${employee.fullName} | edit profile`,
      errorMsgs: [],
      departmentList,
      employee,
    })
  } catch (error) {
    next(error)
  }
}

exports.employeeEditPostController = async (req, res, next) => {
  let { fullName, department, role, salary, joiningDate, nid_no, education, email, contactNo, dateOfBirth, gender, present_street, present_city, present_district, present_country, permanent_street, permanent_city, permanent_district, permanent_country } = req.body
  const {employeeId} = req.params;

  const errors = validationResult(req).formatWith(err => err.msg)
  const errorMsgs = errors.array()
  const departmentList = await Department.findAll({raw: true})
  const employeeData = await Employee.findOne({ 
    where: { id : employeeId },
    include: Department
  });
  const employee = JSON.parse(JSON.stringify(employeeData))

  if(req.file) {
    const updateProfilePicUpload = `/uploads/employee/${req.file.filename}`

    if(!errors.isEmpty()) {
      return res.render('pages/employee/editEmployee.ejs', {
        title: `${employee.fullName} | edit profile`,
        errorMsgs,
        departmentList,
        employee,
      }) 
    }

    try {
      const dpId = parseInt(department)
      const departmentName = await Department.findOne({where: {id: dpId}})
      const employeeUpdateDepartment = departmentName
  
      await Employee.update(
        {
          fullName, role, salary, joiningDate, nid_no, education, email, contactNo, dateOfBirth, gender, present_street, present_city, present_district, present_country, permanent_street, permanent_city, permanent_district, permanent_country, profilePic: updateProfilePicUpload
        }, 
        { where: {
          id: employeeId
        }}
      )
      let updatedEmployee = await Employee.findOne({where: {id: employeeId}})
      await updatedEmployee.setDepartment(employeeUpdateDepartment)

      fs.unlink(`public${employee.profilePic}`, (err) => {
        if(err) {
          throw err
        }
      })
  
      res.redirect('/employee')
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const dpId = parseInt(department)
      const departmentName = await Department.findOne({where: {id: dpId}})
      const employeeUpdateDepartment = departmentName
  
      await Employee.update(
        {
          fullName, role, salary, joiningDate, nid_no, education, email, contactNo, dateOfBirth, gender, present_street, present_city, present_district, present_country, permanent_street, permanent_city, permanent_district, permanent_country
        }, 
        { where: {
          id: employeeId
        }}
      )

      let updatedEmployee = await Employee.findOne({where: {id: employeeId}})
      await updatedEmployee.setDepartment(employeeUpdateDepartment)
  
      res.redirect('/employee')
    } catch (error) {
      next(error)
    }
  }
}

exports.employeeDeleteController = async (req, res, next) => {
  const {employeeId} = req.params;
  const employee = await Employee.findOne({where: {id: employeeId}})

  try {
    await Employee.destroy({
      where: {id: employeeId}
    })
    
    fs.unlink(`public${employee.profilePic}`, (err) => {
      if(err) {
        throw err
      }
    })

    res.redirect('/employee')
  } catch (error) {
    next(error)
  }
}