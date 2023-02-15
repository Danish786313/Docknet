'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
    let hash = await bcrypt.hash('123', 10)
    await queryInterface.bulkInsert('patients', [{
      name: "Demo patient",
      // profilePicture: DataTypes.STRING,
      // phone: DataTypes.STRING,
      // DOB: DataTypes.DATE,
      // gender: DataTypes.ENUM('Male', 'female', 'Other'),
      email: "mohddanishkhan681@gmail.com",
      password: hash,
      // otp: DataTypes.STRING,
      // isVerified:DataTypes.BOOLEAN
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('patients', null, {});
  }
};

