'use strict';
const { hashPassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      })
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be empty'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        },
      },
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be empty'
        },
        notEmpty: {
          msg: 'email cannot be empty'
        }
      },
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be empty'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        },
        len: {
          args:[1,100],
          msg:'Minimal characters is 8'}
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};