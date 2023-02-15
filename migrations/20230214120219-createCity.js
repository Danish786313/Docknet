'use strict';

const path = require("path")
const fs = require("fs")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    fs.readFileSync(path.join(__dirname, "../city.txt"), 'utf-8').split('\n').forEach(line => {
      if (line.length > 0) {
        queryInterface.bulkInsert('cities', [{
          cityName: line.trim()
        }], {})
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('city');
  }
};
