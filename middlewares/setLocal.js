module.exports = () => {
  return (req, res, next) => {
    res.locals.isloggedIn = req.session.isloggedIn
    next()
  }
}