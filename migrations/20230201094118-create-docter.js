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
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'female', 'Other'),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reset_password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isPharmacist: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      clinicName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clinicAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      achivement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      consultCharge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_aprove: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
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