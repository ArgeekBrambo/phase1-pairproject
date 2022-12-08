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
    age: DataTypes.INTEGER,
    location: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};