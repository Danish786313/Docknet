'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docterInfos', {
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
      logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      introVideo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      licenseFront: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identityCardFront: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identityCardBack: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clinicLicenseFront: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('docterInfos');
  }
};