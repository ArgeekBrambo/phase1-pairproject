'use strict';
// const e = require('express');
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const diseases = JSON.parse(fs.readFileSync('./data/disease.json', 'utf-8')).map((el) => {
      delete el.id
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
   return queryInterface.bulkInsert('Diseases', diseases, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Diseases', null, {})
  }
};
