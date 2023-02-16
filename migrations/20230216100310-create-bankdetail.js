'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      docter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'docters',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      branchName: {
        type: Sequelize.STRING
      },
      ifscCode: {
        type: Sequelize.STRING
      },
      accountNo: {
        type: Sequelize.STRING
      },
      accountType: {
        type: Sequelize.ENUM('Current', 'Saving')
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
    await queryInterface.dropTable('bankdetails');
  }
};