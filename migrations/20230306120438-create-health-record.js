'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('health_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
              tableName: 'patients',
            },
            key: 'id'
          },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DOB: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
      },
      consent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      shareRecord: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      emergency_contact: {
        type: Sequelize.JSON,
        allowNull: false
      },
      health_metrics: {
        type: Sequelize.JSON,
        allowNull: false
      },
      drug_allergies: {
        type: Sequelize.JSON,
        allowNull: false
      },
      other_allergies: {
        type: Sequelize.JSON,
        allowNull: false
      },
      vaccination: {
        type: Sequelize.JSON,
        allowNull: false
      },
      diseases: {
        type: Sequelize.JSON,
        allowNull: false
      },
      medication: {
        type: Sequelize.JSON,
        allowNull: false
      },
      smoking: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      drinking_alcohol: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('health_records');
  }
};