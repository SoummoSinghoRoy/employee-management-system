exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    req.session.isloggedIn = true
    return next()
  }
  return res.redirect('/auth/login');
}