const {body} = require('express-validator');
const db = require('../../models/index');
const Department = db.department;

module.exports = [
  body('departmentName')
      .not().isEmpty().withMessage(`Department name can't be empty`)
      .trim()
      .custom(async (departmentName) => {
        let department = await Department.findOne({where: {departmentName}})
        if(department) {
          return Promise.reject(`Department name already exist`)
        }
      })
]