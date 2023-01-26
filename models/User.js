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
      unique: true,
      validate: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      },
      set(value) {
        if (value.length >= 5 && value.length <= 10) {
          this.setDataValue('password', hashSync(value, 10))
        } else {
          throw new Error('Password length should be between 5 to 10 characters.');
        }
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
