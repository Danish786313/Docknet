'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  availability.init({
    docter_id: DataTypes.INTEGER,
    Sunday: DataTypes.BOOLEAN,
    Monday: DataTypes.BOOLEAN,
    Tuesday: DataTypes.BOOLEAN,
    Wednesday: DataTypes.BOOLEAN,
    Thursday: DataTypes.BOOLEAN,
    Friday: DataTypes.BOOLEAN,
    Saturday: DataTypes.BOOLEAN,
    available: DataTypes.BOOLEAN,
    emergency: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'availability',
  });
  return availability;
};