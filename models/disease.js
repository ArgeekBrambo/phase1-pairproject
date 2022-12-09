'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.belongsTo(models.Patient)
    }

    static levelAverage() {
      return Disease.findAll({
        attributes:[
            [sequelize.fn('AVG', sequelize.col('level')), 'avglevel']
        ]
      })
    }

    diseaseCounter(val) {
       if ((val) < 3) { 
        return 'status kesehatan anda mulai membaik'
     } else if ( (val) > 3  && (val) < 7) { 
        return 'status kesehatan anda memburuk'
     } else {  
        return 'status kesehatan anda dalam kondisi kritis'
     }  
    }
  }
  Disease.init({
    nameDisease: DataTypes.STRING,
    description: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};