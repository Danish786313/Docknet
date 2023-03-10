'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class docter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.appointment, {foreignKey: 'docter_id', through: models.docter_patient_appointment})
      this.hasOne(models.docterInfo, {foreignKey: 'docter_id'})
      this.hasOne(models.bankdetail, {foreignKey: 'docter_id'})
    }
  }
  docter.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'female', 'Other'),
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    Token: DataTypes.STRING,
    reset_password: DataTypes.STRING,
    photo: {
      type: DataTypes.STRING,
      get() {
        const imageName = this.getDataValue('photo');
        return process.env.BACKEND_BASE_URL + '/' + imageName;
      }
    },
    degree: DataTypes.STRING,
    isPharmacist: DataTypes.BOOLEAN,
    clinicName: DataTypes.STRING,
    clinicAddress: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    achivement: DataTypes.STRING,
    speciality: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    consultCharge: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    is_aprove: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
  }, {
    sequelize,
    modelName: 'docter',
    hooks: {
      afterCreate : async (docter, options) => {
        await sequelize.models.count_docters.create({
          docter_id: docter.id,
          status: docter.is_aprove,
          date: sequelize.literal("CURRENT_TIMESTAMP")
        }, {transaction: options.transaction})
      },
      beforeUpdate : async (docter, options) => {
        await sequelize.models.count_docters.create({
          docter_id: docter.id,
          status: docter.is_aprove,
          date: sequelize.literal("CURRENT_TIMESTAMP")
        }, {transaction: options.transaction})
      } 
    }
  });
  return docter;
};