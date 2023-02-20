const {body} = require('express-validator');

const gender = ['Male', 'Female', 'Other']

module.exports = [
    body('fullName')
      .not().isEmpty().withMessage(`Full name can't be empty`)
      .trim()
    ,
    body('department')
      .not().isEmpty().withMessage(`Must select a department`)
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
    ,
    body('contactNo')
      .not().isEmpty().withMessage(`Contact no. can't be empty`)
      .trim()
    ,
    body('nid_no')
      .not().isEmpty().withMessage(`Nid no. can't be empty`)
      .trim()
    ,
    body('education')
      .not().isEmpty().withMessage(`Education can't be empty`)
      .trim()
    ,
    body('dateOfBirth')
      .not().isEmpty().withMessage(`Date of birth can't be empty`)
    ,
    body('gender')
        .isIn(gender).withMessage('Must select gender')
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