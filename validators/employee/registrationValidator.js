const {body} = require('express-validator');

const db = require('../../models/index');
const Employee = db.employee;

module.exports = [
  body('fullName')
      .not().isEmpty().withMessage(`Full name can't be empty`)
      .trim()
  ,
  body('department')
      .not().isEmpty().withMessage(`Department can't be empty`)
  ,
  body('role')
      .not().isEmpty().withMessage(`Role can't be empty`)
      .trim()
  ,
  body('salary')
      .not().isEmpty().withMessage(`Salary can't be empty`)
      .trim()
  ,
  body('joiningDate')
      .not().isEmpty().withMessage(`Joined can't be empty`)
      .trim()
  ,
  body('email')
      .not().isEmpty().withMessage(`Email can't be empty`)
      .isEmail().withMessage(`Must use valid email`)
      .trim()
      .custom(async (email) => {
        let employee = await Employee.findOne({where: {email}})
        if(employee) {
          return Promise.reject(`Email must be unique`)
        }
      })
  ,
  body('contactNo')
      .not().isEmpty().withMessage(`Contact no. can't be empty`)
      .trim()
  ,
  body('nid_no')
      .not().isEmpty().withMessage(`Nid no. can't be empty`)
      .trim()
      .custom(async (nid_no) => {
        let employee = await Employee.findOne({where: {nid_no}})
        if(employee) {
          return Promise.reject(`Nid no. must be unique`)
        }
      })
    ,
  body('education')
      .not().isEmpty().withMessage(`Education can't be empty`)
      .trim()
  ,
  body('dateOfBirth')
      .not().isEmpty().withMessage(`Date of birth can't be empty`)
  ,
  body('gender')
      .not().isEmpty().withMessage(`Gender can't be empty`)
  ,
  body('present_street')
      .not().isEmpty().withMessage(`Present street can't be empty`)
      .trim()
  ,
  body('present_city')
      .not().isEmpty().withMessage(`Present city can't be empty`)
      .trim()
  ,
  body('present_district')
      .not().isEmpty().withMessage(`Present district can't be empty`)
      .trim()
  ,
  body('present_country')
      .not().isEmpty().withMessage(`Present country can't be empty`)
      .trim()
  ,
  body('permanent_street')
      .not().isEmpty().withMessage(`Permanent street can't be empty`)
      .trim()
  ,
  body('permanent_city')
      .not().isEmpty().withMessage(`Permanent city can't be empty`)
      .trim()
  ,
  body('permanent_district')
      .not().isEmpty().withMessage(`Permanent district can't be empty`)
      .trim()
  ,
  body('permanent_country')
      .not().isEmpty().withMessage(`Permanent country can't be empty`)
      .trim()
]