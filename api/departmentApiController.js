const db = require('../models/index');
const Department = db.department;
const Employee = db.employee

exports.departmentListGetController = async (req, res, next) => {
  try {
    const departments = await Department.findAll({include: Employee})
    res.status(200).json({
      departments
    })
  } catch (error) {
    res.json({
      error: 'Something happend wrong',
      status: '500'
    })
    next(error)
  }
}