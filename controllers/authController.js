exports.signUpGetController = (req, res, next) => {
  return res.render('pages/auth/signUp.ejs', {
    title: "Sign up here"
  })
}

exports.signUpPostController = async (req, res, next) => {}