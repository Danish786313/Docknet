'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('Male', 'female', 'Other')
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      reset_password: {
        type: Sequelize.STRING
      },
      Token: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      isPharmacist: {
        type: Sequelize.BOOLEAN
      },
      clinicName: {
        type: Sequelize.STRING
      },
      clinicAddress: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.INTEGER
      },
      achivement: {
        type: Sequelize.STRING
      },
      speciality: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      bank_details: {
        type: Sequelize.STRING
      },
      consultCharge: {
        type: Sequelize.INTEGER
      },
      otp: {
        type: Sequelize.STRING
      },
      is_aprove: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('docters');
  }
};