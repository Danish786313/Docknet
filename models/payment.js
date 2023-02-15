'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    patient_id: DataTypes.INTEGER,
    docter_id: DataTypes.INTEGER,
    orderId: DataTypes.STRING,
    receiptId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    signature: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};