const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Author_Organization = sequelize.define('Author_Organization', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    establishDay: {
      type: DataTypes.DATE,
      //or
      //type: DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('establishDay')).format('YYYY-MM-DD')
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenceNo: {
      type: DataTypes.BIGINT,
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
    street: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    freezeTableName: true,
    timestamps: false
  })
  return Author_Organization 
}