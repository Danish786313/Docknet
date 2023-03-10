'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class docter_patient_appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.patient, {foreignKey: "patient_id"});
      this.belongsTo(models.docter, {foreignKey: "docter_id"});
      this.belongsTo(models.appointment, {foreignKey: "apointment_id"});
    }
  }
  docter_patient_appointment.init({
    docter_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    apointment_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'docter_patient_appointment',
  });
  return docter_patient_appointment;
};