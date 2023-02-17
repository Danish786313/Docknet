'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.appointment, {foreignKey: 'patient_id', through: models.docter_patient_appointment})
      this.hasOne(models.patient, {as: 'child', foreignKey: 'parent_id'})
      this.belongsTo(models.patient, {as:'parent', foreignKey: 'parent_id'});
    }
  }
  patient.init({
    name: DataTypes.STRING,
    profilePicture: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('profilePicture');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    phone: DataTypes.STRING,
    DOB: DataTypes.DATE,
    gender: DataTypes.ENUM('Male', 'female', 'Other'),
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    Token: DataTypes.STRING,
    reset_password: DataTypes.STRING,
    otp: DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN,
    parent_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'patient',
  });
  return patient;
};