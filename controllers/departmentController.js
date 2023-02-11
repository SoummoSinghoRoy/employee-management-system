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

exports.departmentDeleteController = async (req, res, next) => {
  const departmentId = req.params.id
  
  try {
    await Department.destroy({
      where: {id: departmentId}
    })
    res.redirect('/department')
  } catch (error) {
    next(error)
  }
}

exports.departmentNameEditController = async (req, res, next) => {
  let {departmentUpdateName} = req.body
  let { id } = req.params

  try {
    await Department.update(
      { departmentName: departmentUpdateName },
      { where: {
        id
      }}
    )
    res.redirect('/department')
  } catch (error) {
    next(error)
  }
}