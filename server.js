require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./models/index');
const setRoutes = require('./router/routes');
const setMiddlewares = require('./middlewares/middlewares');

app.set('view engine', 'ejs');
app.set('views', 'views');

setMiddlewares(app)
setRoutes(app)

app.get('/', (req, res) => {
  res.status(200).send('Welcome')
})
app.use((req,res,next) => {
  let error = new Error('404 page not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  if(error.status === 404) {
    return res.send('404 not found')
  }
  console.log(error);
  return res.send('500 server error')
})

const PORT = process.env.PORT || 4000

db.sequelize.sync()
        .then(() => {
          app.listen(PORT, () => {
            console.log(`Server is running successfully on port: ${PORT}`);
          })
          console.log('Establish db connection');
        })
        .catch((error) => {
          console.log(`DB connection failed. error: ${error}`);
        })