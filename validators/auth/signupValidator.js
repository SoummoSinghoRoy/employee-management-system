const {body} = require('express-validator');
const db = require('../../models/index');
const User = db.user;

module.exports = [
  body('username')
      .not().isEmpty().withMessage(`Username can't be empty`)
      .trim()
      .custom(async (username) => {
        let user = await User.findOne({where: {username}})
        if(user) {
          return Promise.reject(`Username already exist`)
        }
      })
  ,
  body('password')
      .not().isEmpty().withMessage(`Password can't be empty`)
      .isLength({min: 5, max: 10}).withMessage(`Password length should be between 5 to 10 characters.`)
]