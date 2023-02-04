const express = require('express');
const config = require('config');
const morgan = require('morgan');
const passport = require('./passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql2 = require('mysql2/promise');
const setLocal = require('./setLocal');

const options = {
	host: config.get('db_host'),
	port: config.get('db_port'),
	user: config.get('db_user'),
	password: config.get('db_password'),
	database: config.get('db')
};

const connection = mysql2.createPool(options)

const sessionStore = new MySQLStore({expiration: 21600000,}, connection, (err) => {
  if(err) {
    console.log(err);
  }
})


const middlewares = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({extended: true}),
  express.json(),
  session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
  passport.initialize(),
  passport.session(),
  setLocal()
]

module.exports = app => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}