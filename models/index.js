const config = require('config');
const {Sequelize, DataTypes} = require('sequelize');

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

// let db = {}

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

require('./User')(sequelize, DataTypes);
require('./Author_Organization')(sequelize, DataTypes);
const Employee = require('./Employee')(sequelize, DataTypes);
const Department = require('./Department')(sequelize, DataTypes);

Department.hasOne(Employee);
Employee.belongsTo(Department);

// module.exports = db;
module.exports = sequelize