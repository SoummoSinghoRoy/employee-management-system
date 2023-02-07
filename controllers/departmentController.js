const {validationResult} = require('express-validator');

const db = require('../models/index');
let Department = db.department;


exports.departmentGetController = (req, res, next) => {
  res.render('pages/department/department.ejs', {
    title: 'Depratments',
    errors: null
  })
}

exports.departmentCreatePostController = async (req, res, next) => {
  let { departmentName } = req.body;

  let errors = validationResult(req).formatWith(error => error.msg)

  if(!errors.isEmpty()) {
    return res.render('pages/department/department.ejs', {
      title: 'Depratments',
      errors: errors.mapped()
    })
  }
  try {
    await Department.create({departmentName})
    res.render('pages/department/department.ejs', {
      title: 'Depratments'
    })
  } catch (error) {
    next(error)
  }
}