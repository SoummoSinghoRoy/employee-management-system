const routes = [
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