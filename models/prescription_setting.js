'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescription_setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.docter, {foreignKey: "docter_id"});
    }
  }
  prescription_setting.init({
    docter_id: DataTypes.INTEGER,
    logo: DataTypes.JSON,
    qrcode: DataTypes.JSON,
    name: DataTypes.JSON,
    speciality: DataTypes.JSON,
    title: DataTypes.JSON,
    cname: DataTypes.JSON,
    email: DataTypes.JSON,
    address: DataTypes.JSON,
    phone: DataTypes.JSON,
    line: DataTypes.JSON,
    patient: DataTypes.JSON,
    date: DataTypes.JSON,
    signature: DataTypes.JSON,
    description: DataTypes.JSON,
    logo_url: {
      type :DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('logo_url');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    signature_url: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('signature_url');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    }
  }, {
    sequelize,
    modelName: 'prescription_setting',
  });
  return prescription_setting;
};