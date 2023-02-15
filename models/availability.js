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
    days: DataTypes.JSON,
    available: DataTypes.BOOLEAN,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    emergency: DataTypes.BOOLEAN,
    slots: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'availability',
  });
  return availability;
};