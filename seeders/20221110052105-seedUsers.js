'use strict';
const fs = require('fs')
const { hashPassword } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map((el) => {
      delete el.id
      el.password = hashPassword(el.password)
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
  //  console.log(users);
   return queryInterface.bulkInsert('Users', users, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};
