const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joiningDate: {
      type: DataTypes.DATE,
      //or
      //type: DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('openingDay')).format('YYYY-MM-DD')
      },
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "must be use valid email address"
        }
      }
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nid_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    present_street: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    present_city: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    present_district: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    present_country: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    permanent_street: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    permanent_city: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    permanent_district: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    permanent_country: {
      type: DataTypes.STRING,
      allowNull: false, 
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Employee
}