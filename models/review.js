'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review.init({
    patient_id: DataTypes.INTEGER,
    docter_id: DataTypes.INTEGER,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};