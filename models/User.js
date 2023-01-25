const {hashSync, compareSync} = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', hashSync(value, 12))
      },
      get() {
        const hashedPass = this.getDataValue('password')
        return compareSync('password', hashedPass)
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return User
}
