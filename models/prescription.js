'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prescription.init({
    docter_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    prescription_file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'prescription',
  });
  return prescription;
};