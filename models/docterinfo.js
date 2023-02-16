'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class docterInfo extends Model {
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
  docterInfo.init({
    docter_id: DataTypes.INTEGER,
    introVideo: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('introVideo');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    licenseFront: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('licenseFront');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    licenseBack: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('licenseBack');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    identityCardFront: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('identityCardFront');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    identityCardBack: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('identityCardBack');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    clinicLicenseFront: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('clinicLicenseFront');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    clinicLicenceBack: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('clinicLicenceBack');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
  }, {
    sequelize,
    modelName: 'docterInfo',
  });
  return docterInfo;
};