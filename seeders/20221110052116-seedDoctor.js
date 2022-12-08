'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up (queryInterface, Sequelize) {
  const profiles = JSON.parse(fs.readFileSync('./data/doctor.json', 'utf-8')).map((el) => {
    el.createdAt = el.updatedAt = new Date()
    return el
  })
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
 return queryInterface.bulkInsert('Doctors', profiles, {})
  },

 down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Doctors', null, {})
  }
};
