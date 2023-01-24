const config = require('config');
const {Sequelize} = require('sequelize');

// sequelize configuration
const sequelize = new Sequelize(config.get('db'), config.get('db_user'), config.get('db_password'), {
  host: config.get('db_host'),
  port: config.get('db_port'),
  dialect: config.get('dialect'),
})

sequelize.authenticate()
          .then(() => {
            console.log('Database connected succesfully');
          })
          .catch(err => {
            console.log(`Database not connected - ${err}`);
          })

module.exports = sequelize;