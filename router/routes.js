const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboardRoute');
const employeeRoute = require('./employeeRoute');

const routes = [
  {
    path: '/employee',
    handler: employeeRoute
  },
  {
    path: '/dashboard',
    handler: dashboardRoute
  },
  {
    path: '/auth',
    handler: authRoute
  },
  {
    path: '/',
    handler: (req, res) => {
      return res.send('Welcome to employee management system')
    }
  }
]

module.exports = (app) => {
  routes.forEach((route) => {
    if(route.path === '/') {
      app.get(route.path, route.handler)
    }else{
      app.use(route.path, route.handler)
    }
  })
}