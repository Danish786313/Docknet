'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prescription_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      docter_id: {
        type: Sequelize.INTEGER
      },
      logo: {
        type: Sequelize.JSON
      },
      qrcode: {
        type: Sequelize.JSON
      },
      name: {
        type: Sequelize.JSON
      },
      speciality: {
        type: Sequelize.JSON
      },
      title: {
        type: Sequelize.JSON
      },
      cname: {
        type: Sequelize.JSON
      },
      email: {
        type: Sequelize.JSON
      },
      address: {
        type: Sequelize.JSON
      },
      phone: {
        type: Sequelize.JSON
      },
      line: {
        type: Sequelize.JSON
      },
      patient: {
        type: Sequelize.JSON
      },
      date: {
        type: Sequelize.JSON
      },
      signature: {
        type: Sequelize.JSON
      },
      description: {
        type: Sequelize.JSON
      },
      logo_url: {
        type: Sequelize.STRING
      },
      signature_url: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('prescription_settings');
  }
};