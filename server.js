require('dotenv').config()
const express = require('express');
const app = express();
const sequelize = require('./models/index');
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

sequelize.sync({ force: true, alter: true })
        .then(() => {
          app.listen(PORT, () => {
            console.log(`Server is running successfully on port: ${PORT}`);
          })
        })
        .catch((error) => {
          console.log(`DB connection failed. error: ${error}`);
        })