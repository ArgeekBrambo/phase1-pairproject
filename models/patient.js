'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Disease,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      })
      Patient.belongsTo(models.Doctor)
    }
  }
  Patient.init({
    status: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};