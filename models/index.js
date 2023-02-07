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

let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User')(sequelize, DataTypes);
db.employee = require('./Employee')(sequelize, DataTypes);
db.department = require('./Department')(sequelize, DataTypes);

// Department.hasOne(Employee);
// Employee.belongsTo(Department);
db.department.hasMany(db.employee);
db.employee.belongsTo(db.department);

module.exports = db;