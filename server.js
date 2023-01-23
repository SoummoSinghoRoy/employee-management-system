const express = require('express');
const app = express();

const setRoutes = require('./router/routes');
const setMiddlewares = require('./middlewares/middlewares');

// setup views/template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// using middleware from middleware directory
setMiddlewares(app)

// using route from route directory
setRoutes(app)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running successfully on port: ${PORT}`);
})