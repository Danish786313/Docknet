'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  speciality.init({
    speciality: DataTypes.STRING,
    commission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'speciality',
  });
  return speciality;
};