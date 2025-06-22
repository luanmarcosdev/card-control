'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cards_migrations', [
      {
        entity_id: 1,
        last_four_digits: "1234",
        due_day: 10,
        createdAt: new Date()
      },
      {
        entity_id: 2,
        last_four_digits: "2341",
        due_day: 20,
        createdAt: new Date()
      },
      {
        entity_id: 1,
        last_four_digits: "3412",
        due_day: 30,
        createdAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cards_migrations', null, {});
  }
};
