'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class health_record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  health_record.init({
    patient_id: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    gender: DataTypes.ENUM('Male', 'Female'),
    consent: DataTypes.BOOLEAN,
    shareRecord: DataTypes.BOOLEAN,
    emergency_contact: DataTypes.JSON,
    health_metrics: DataTypes.JSON,
    drug_allergies: DataTypes.JSON,
    other_allergies: DataTypes.JSON,
    vaccination: DataTypes.JSON,
    diseases: DataTypes.JSON,
    medication: DataTypes.JSON,
    smoking: DataTypes.BOOLEAN,
    drinking_alcohol: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'health_record',
  });
  return health_record;
};