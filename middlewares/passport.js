const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const db = require('../models/index');
const User = db.user;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username} })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch(err => done(err))
  }
));
passport.serializeUser(function(user, done) {
  done(null, { id: user.id, username: user.username });
  console.log('serialized');
});

passport.deserializeUser(function(user, done) {
  User.findByPk(user.id)
      .then((user) => {
        return done(null, user)
      })
      .catch(err => done(err))
});

module.exports = passport;