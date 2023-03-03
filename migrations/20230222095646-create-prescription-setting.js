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
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'docters',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      logo: {
        type: Sequelize.JSON,
        allowNull: false
      },
      qrcode: {
        type: Sequelize.JSON,
        allowNull: false
      },
      name: {
        type: Sequelize.JSON,
        allowNull: false
      },
      speciality: {
        type: Sequelize.JSON,
        allowNull: false
      },
      title: {
        type: Sequelize.JSON,
        allowNull: false
      },
      cname: {
        type: Sequelize.JSON,
        allowNull: false
      },
      email: {
        type: Sequelize.JSON,
        allowNull: false
      },
      address: {
        type: Sequelize.JSON,
        allowNull: false
      },
      phone: {
        type: Sequelize.JSON,
        allowNull: false
      },
      line: {
        type: Sequelize.JSON,
        allowNull: false
      },
      patient: {
        type: Sequelize.JSON,
        allowNull: false
      },
      date: {
        type: Sequelize.JSON,
        allowNull: false
      },
      signature: {
        type: Sequelize.JSON,
        allowNull: false
      },
      description: {
        type: Sequelize.JSON,
        allowNull: false
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      signature_url: {
        type: Sequelize.STRING,
        allowNull: true,
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