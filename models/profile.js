'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // get ageChecking() {
    //   let age = this.age
    //   return age
    // }
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasOne(models.Doctor)
      Profile.hasOne(models.Patient)
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age cannot be empty'
        },
        notEmpty: {
          msg: 'Age cannot be empty'
        },
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location cannot be empty'
        },
        notEmpty: {
          msg: 'Location cannot be empty'
        },
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });

  Profile.beforeCreate((user, option) => {
    if(user.gender === 'male') {
      user.name = 'Mr.' + user.name
    } else {
      user.name = 'Mrs.' + user.name
    }
  })

  
  return Profile;
};