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
      introVideo: {
        type: Sequelize.STRING
      },
      licenseFront: {
        type: Sequelize.STRING
      },
      licenseBack: {
        type: Sequelize.STRING
      },
      identityCardFront: {
        type: Sequelize.STRING
      },
      identityCardBack: {
        type: Sequelize.STRING
      },
      clinicLicenseFront: {
        type: Sequelize.STRING
      },
      clinicLicenceBack: {
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
    await queryInterface.dropTable('docterInfos');
  }
};