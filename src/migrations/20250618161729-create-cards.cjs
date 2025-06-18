'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards_migrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      family_members_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      last_four_digits: {
        allowNull: false,
        type: Sequelize.STRING
      },
      due_day: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 31
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards_migrations');
  }
};