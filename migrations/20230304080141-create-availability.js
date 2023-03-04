'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('availabilities', {
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
            model: {
              tableName: 'docters',
            },
            key: 'id'
          },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      Sunday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Monday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Tuesday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Wednesday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Thursday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Friday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Saturday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      emergency: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('availabilities');
  }
};