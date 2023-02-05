const {body} = require('express-validator');

module.exports = [
  body('username')
      .not().isEmpty().withMessage('Must use valid username')
  ,
  body('password')
      .not().isEmpty().withMessage('Must use valid password')
]