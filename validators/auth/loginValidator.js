const {body} = require('express-validator');

module.exports = [
  body('password')
      .not().isEmpty().withMessage('Must use valid password')
]