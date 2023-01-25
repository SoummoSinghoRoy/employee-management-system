require('dotenv').config()
const express = require('express');
const app = express();
const sequelize = require('./models/index');
const setRoutes = require('./router/routes');
const setMiddlewares = require('./middlewares/middlewares');

app.set('view engine', 'ejs');
app.set('views', 'views');

setMiddlewares(app)
setRoutes(app)


const PORT = process.env.PORT || 8080

sequelize.sync({ force: true, alter: true })
        .then(() => {
          app.listen(PORT, () => {
            console.log(`Server is running successfully on port: ${PORT}`);
          })
          console.log('Establish db connection');
        })
        .catch((error) => {
          console.log(`DB connection failed. error: ${error}`);
        })