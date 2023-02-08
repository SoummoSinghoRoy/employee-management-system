const {validationResult} = require('express-validator');

const db = require('../models/index');
let Department = db.department;


exports.departmentGetController = async (req, res, next) => {
  try {
    const departmentList = await Department.findAll({raw: true})

    res.render('pages/department/department.ejs', {
      title: 'Depratments',
      errors: null,
      departmentList
    })
  } catch (error) {
    next(error)
  }
}

exports.departmentCreatePostController = async (req, res, next) => {
  let { departmentName } = req.body;

  let errors = validationResult(req).formatWith(error => error.msg)

  if(!errors.isEmpty()) {
    return res.render('pages/department/department.ejs', {
      title: 'Depratments',
      errors: errors.mapped(),
      departmentList: []
    })
  }
  try {
    await Department.create({departmentName})
    const departmentList = await Department.findAll({raw: true})

    res.render('pages/department/department.ejs', {
      title: 'Depratments',
      errors: null,
      departmentList
    })
  } catch (error) {
    next(error)
  }
}