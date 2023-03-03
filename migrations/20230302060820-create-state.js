'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    await queryInterface.sequelize.query(`insert into states (name) values('Ariana'),('Beja'),('Ben Arous'),('Bizerte'),('Gabès'),('Gafsa'),('Jendouba'),('Kairouan'),('Kasserine'),('Kebili'),('Kef'),('Mahdia'),('Manouba'),('Medenine'),('Monastir'),('Nabeul'),('Sfax'),('Sidi Bou Zid'),('Siliana'),('Sousse'),('Tataouine'),('Tozeur'),('Tunis'),('Zaghouan')`)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('states');
  }
};