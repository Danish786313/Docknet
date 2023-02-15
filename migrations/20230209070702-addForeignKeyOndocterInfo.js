'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.sequelize.transaction(t => {
    //   return Promise.all([
    //     queryInterface.addColumn('docterinfos', 'docter_id', {
    //       type: Sequelize.DataTypes.INTEGER,
    //       allowNull: false,
    //       references: {
    //         model: {
    //           tableName: 'docters',
    //         },
    //         key: 'id'
    //       },
    //     }, { transaction: t }),
    //   ]);
    // });
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.sequelize.transaction(t => {
    //   return Promise.all([
    //     queryInterface.removeColumn('docterinfos', 'docter_id', { transaction: t }),
    //   ]);
    // });
  }
};
