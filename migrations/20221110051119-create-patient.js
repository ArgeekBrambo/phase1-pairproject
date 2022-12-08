'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'sakit'
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ProfileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
 down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  }
};