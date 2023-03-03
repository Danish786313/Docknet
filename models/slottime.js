'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment")
module.exports = (sequelize, DataTypes) => {
  class slottime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slottime.init({
    docter_id: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    slots: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'slottime',
  });
  return slottime;
};