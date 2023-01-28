const express = require('express');
const config = require('config');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./passport');
const MySQLStore = require('express-mysql-session')(session);
const mysql2 = require('mysql2/promise')

const options = {
	host: config.get('db_host'),
	port: config.get('db_port'),
	user: config.get('db_user'),
	password: config.get('db_password'),
	database: config.get('db'),
  expiration: 120000,
  createDatabaseTable: false,
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'sessionId',
			expires: 'sessionExpire',
			data: 'user'
		}
	}
}
const connection = mysql2.createPool(options);
const sessionStore = new MySQLStore({}, connection);

const middlewares = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({extended: true}),
  express.json(),
  session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }),
  passport.initialize(),
  passport.session(),
]

module.exports = app => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}