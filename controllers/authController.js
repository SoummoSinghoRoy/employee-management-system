const {validationResult} = require('express-validator');
const db = require('../models/index');
let User = db.user

exports.signUpGetController = (req, res, next) => {
  return res.render('pages/auth/signUp.ejs', {
    title: "Sign up here",
    errors: {}
  })
}

exports.signUpPostController = async (req, res, next) => {
  let { username, password } = req.body;
  let errors = validationResult(req).formatWith(error => error.msg)

  if(!errors.isEmpty()) {
    return res.render('pages/auth/signUp.ejs', {
      title: 'Sign up here',
      errors: errors.mapped(),
    })
  }
  try {
    await User.create({username, password})
    res.redirect('/auth/signup');
  } catch (error) {
    console.log(error);
    next(error)
  }
}