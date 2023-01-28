exports.dashboardGetController = (req, res, next) => {
  res.render('pages/dashboard/dashboard.ejs', {
    title: 'Dashboard'
  })
}