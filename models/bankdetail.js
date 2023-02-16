'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.docter, {foreignKey: "docter_id"})
    }
  }
  bankdetail.init({
    docter_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    branchName: DataTypes.STRING,
    ifscCode: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    accountType: DataTypes.ENUM('Current', 'Saving')
  }, {
    sequelize,
    modelName: 'bankdetail',
  });
  return bankdetail;
};