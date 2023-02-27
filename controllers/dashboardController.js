const db = require('../models/index');
const Department = db.department;
const Employee = db.employee;

exports.dashboardGetController = async (req, res, next) => {

  try {
    const departments = await Department.findAll({include: Employee})
    const allData = JSON.parse(JSON.stringify(departments))
    res.render('pages/dashboard/dashboard.ejs', {
      title: 'Dashboard',
      allData
    })
  } catch (error) {
    next(error)
  }
  
}