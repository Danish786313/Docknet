'use strict';

const bcrypt = require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let hash = await bcrypt.hash('123', 10)
    await queryInterface.bulkInsert('admins', [{
      name: "Admin",
      email: "mohddanishkhan681@gmail.com",
      password: hash,
    }]);
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('admins', null, {});
     
  }
};
