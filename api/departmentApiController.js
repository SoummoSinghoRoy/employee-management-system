const db = require('../models/index');
const Department = db.department;

exports.departmentListGetController = async (req, res, next) => {
  try {
    const departmentList = await Department.findAll({raw: true})
    res.status(200).json({
      Departments: departmentList
    })
  } catch (error) {
    res.json({
      error: 'Something happend wrong',
      status: '500'
    })
    next(error)
  }
}