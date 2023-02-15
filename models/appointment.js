'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.patient, {foreignKey: 'patient_id', through: models.docter_patient_appointment})
      this.belongsToMany(models.docter, {foreignKey: 'docter_id', through: models.docter_patient_appointment})
    }
  }
  appointment.init({
    date: DataTypes.DATE,
    time: DataTypes.DATE,
    patient_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('Male', 'female', 'Other'),
    problem_desc: DataTypes.TEXT,
    status: DataTypes.ENUM('Request', 'Cancelled', 'Upcoming', 'Reshedule', 'Emergency', 'Completed')
  }, {
    sequelize,
    modelName: 'appointment',
  });
  return appointment;
};